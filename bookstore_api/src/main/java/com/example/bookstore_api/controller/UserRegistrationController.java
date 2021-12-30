package com.example.bookstore_api.controller;

import com.example.bookstore_api.dto.UserRegistrationDto;
import com.example.bookstore_api.entity.User;
import com.example.bookstore_api.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.bookstore_api.ApiPath.*;

@RestController
@RequestMapping(REGISTER)
public class UserRegistrationController {

    private final UserService userService;

    public UserRegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void registerUser(@RequestBody UserRegistrationDto user){
        userService.createNewUser(user);
    }
}
