package com.rishi.TaskManager.Controller;

import com.rishi.TaskManager.Model.User;
import com.rishi.TaskManager.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.loginUser(user.getEmail(), user.getPassword());
    }
}
