package com.rishi.TaskManager.Repository;

import com.rishi.TaskManager.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
