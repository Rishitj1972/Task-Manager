package com.rishi.TaskManager.controller;

import com.rishi.TaskManager.dto.TaskDTO;
import com.rishi.TaskManager.model.Task;
import com.rishi.TaskManager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody Task task, Principal principal) {
        // principal.getName() gives email from JWT
        return taskService.createTaskForUser(task,principal.getName());
    }

    @GetMapping
    public List<TaskDTO> getTasks(Principal principal) {
        return taskService.getTasksForUsers(principal.getName());
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id,
                           Principal principal) {
        taskService.deleteTask(id,principal.getName());

        return "Task deleted successfully";
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                           @RequestBody Task task,
                           Principal principal) {

        return taskService.updateTask(id,task,principal.getName());
    }
}
