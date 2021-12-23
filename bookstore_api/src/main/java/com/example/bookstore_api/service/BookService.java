package com.example.bookstore_api.service;

import com.example.bookstore_api.entity.Book;
import com.example.bookstore_api.exception.BookNotFoundException;
import com.example.bookstore_api.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void createBook(Book book) {
        bookRepository.save(book);
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public Book getBook(UUID id) {
        return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
    }

    public void updateBook(Book book) {
        bookRepository.save(book);
    }

    public void deleteBook(UUID id) {
        bookRepository.deleteById(id);
    }

    public List<Book> findBooks(String query) {
        query = "%" + query + "%";
        return bookRepository.findByTitleLikeOrAuthorLike(query, query);
    }


}
