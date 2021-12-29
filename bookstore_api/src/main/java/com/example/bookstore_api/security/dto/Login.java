package com.example.bookstore_api.security.dto;

import lombok.Data;

@Data
public class Login {
    private String username;
    private String password;
}
