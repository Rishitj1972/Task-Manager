package com.rishi.TaskManager.Service;

import com.rishi.TaskManager.Exception.TaskNotFoundException;
import com.rishi.TaskManager.Model.Task;
import com.rishi.TaskManager.Model.User;
import com.rishi.TaskManager.Repository.TaskRepository;
import com.rishi.TaskManager.Repository.UserRepository;
import org.springframework.stereotype.Service;

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

    public List<Task> getTasksForUsers(String email) {

        return taskRepository.findByUserEmail(email);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));
    }

    public Task updateTask(Long id,Task updatedTask) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));

        if(existingTask != null) {
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setComplete(updatedTask.isComplete());

            return taskRepository.save(existingTask);
        }
        return null;
    }
}
