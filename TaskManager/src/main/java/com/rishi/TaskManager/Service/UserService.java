package com.rishi.TaskManager.Service;

import com.rishi.TaskManager.Model.User;
import com.rishi.TaskManager.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()) {
            throw new RuntimeException("Email is already acquired");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User loginUser(String email,String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isEmpty()) {
            throw new RuntimeException("User not Found");
        }

        User user = userOptional.get();

        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
}
