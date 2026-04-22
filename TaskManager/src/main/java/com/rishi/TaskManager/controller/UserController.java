package com.rishi.TaskManager.controller;

import com.rishi.TaskManager.dto.AuthResponse;
import com.rishi.TaskManager.model.User;
import com.rishi.TaskManager.service.UserService;
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
    public AuthResponse loginUser(@RequestBody User user) {

        String token =  userService.loginUser(user.getEmail(), user.getPassword());
        return new AuthResponse(token);
    }
}
