package com.example.bookstore_api.controller;

import com.example.bookstore_api.dto.UserDto;
import com.example.bookstore_api.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.bookstore_api.ApiPath.*;

@RestController
@RequestMapping(LOGIN)
public class LoginController {

    @PostMapping
    public UserDto login(@AuthenticationPrincipal User user) {

        return new UserDto(user);
    }
}
