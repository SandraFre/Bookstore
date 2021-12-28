package com.example.bookstore_api.dto;

import com.example.bookstore_api.entity.Role;
import com.example.bookstore_api.entity.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private String username;
    private String fullName;
    private Set<String> roles;

    public UserDto(User user) {
        username = user.getUsername();
        fullName = user.getFullName();
        roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }
}
