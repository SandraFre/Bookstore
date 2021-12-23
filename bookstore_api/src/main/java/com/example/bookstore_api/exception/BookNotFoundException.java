package com.example.bookstore_api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class BookNotFoundException extends RuntimeException {
    private final UUID id;
}
