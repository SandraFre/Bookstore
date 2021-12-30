package com.example.bookstore_api.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {

    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String repeatPassword;
}
