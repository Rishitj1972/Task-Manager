package com.rishi.TaskManager.Controller;

import com.rishi.TaskManager.Model.Task;
import com.rishi.TaskManager.Service.TaskService;
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
    public Task createTask(@RequestBody Task task, Principal principal) {
        // principal.getName() gives email from JWT
        return taskService.createTaskForUser(task,principal.getName());
    }

    @GetMapping
    public List<Task> getTasks(Principal principal) {
        return taskService.getTasksForUsers(principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                           @RequestBody Task task) {

        return taskService.updateTask(id,task);
    }
}
