package com.rishi.TaskManager.service;

import com.rishi.TaskManager.dto.TaskDTO;
import com.rishi.TaskManager.exception.TaskNotFoundException;
import com.rishi.TaskManager.exception.UnauthorizedException;
import com.rishi.TaskManager.model.Task;
import com.rishi.TaskManager.model.User;
import com.rishi.TaskManager.repository.TaskRepository;
import com.rishi.TaskManager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTaskForUser(Task task,String userEmail) {

        Optional<User> optionalUser= userRepository.findByEmail(userEmail);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not Found"));
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<TaskDTO> getTasksForUsers(String email) {

        List<Task> tasks = taskRepository.findByUserEmail(email);

        List<TaskDTO> dtoList = new ArrayList<>();

        for(Task task : tasks) {
            dtoList.add(convertDTO(task));
        }

        return dtoList;
    }

    public void deleteTask(Long id,String email) {

        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Not Tasks Found"));

        if(!task.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("You cannot delete this task");
        }

        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));
    }


    public Task updateTask(Long id,Task updatedTask,String email) {

        Task existingTask = taskRepository.findById(id).orElseThrow(()
                -> new TaskNotFoundException("Task with id " + id + " not found"));

        if(!existingTask.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("You cannot modify this task");
        }

        if(updatedTask.getTitle() != null) {
            existingTask.setTitle(updatedTask.getTitle());
        }
        if(updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
        existingTask.setComplete(updatedTask.isComplete());

        return taskRepository.save(existingTask);
    }


    private TaskDTO convertDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setCompleted(task.isComplete());

        return dto;
    }
}
