package com.example.bookstore_api.controller;

import static com.example.bookstore_api.ApiPath.*;
import static org.springframework.http.MediaType.*;

import com.example.bookstore_api.entity.Book;
import com.example.bookstore_api.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(BOOKS)
@Api(tags = "Book controller")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @ApiOperation(value = "Gauti visas knygas", tags = "getProducts", httpMethod = "GET")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Duomenys sekmingai uzkrauti"),
            @ApiResponse(code = 403, message = "Vartotojas neturi teisiu"),
            @ApiResponse(code = 404, message = "Nepavyko rasti knygu")
    })
    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping(value = BOOK, produces = APPLICATION_JSON_VALUE)
    public Book getBook(@PathVariable(ID_VARIABLE) UUID id) {
        return bookService.getBook(id);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createBook(@RequestBody Book book) {
        bookService.createBook(book);
    }

    @PutMapping(consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateBook(@RequestBody Book book) {
        bookService.updateBook(book);
    }

    @DeleteMapping(BOOK)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable(ID_VARIABLE) UUID id) {
        bookService.deleteBook(id);
    }

    @GetMapping(SEARCH)
    public List<Book> searchBooks(@RequestParam String query) {
        return bookService.findBooks(query);
    }

}
