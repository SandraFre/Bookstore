package com.example.bookstore_api.advice;

import com.example.bookstore_api.exception.BookNotFoundException;
import com.example.bookstore_api.exception.data.ExceptionResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(BookNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handlingBookNotFound(BookNotFoundException exception){
        return new ExceptionResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handlingEmptyResult(EmptyResultDataAccessException exception){
        return new ExceptionResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

}
