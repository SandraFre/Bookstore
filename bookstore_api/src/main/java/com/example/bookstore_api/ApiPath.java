package com.example.bookstore_api;

public interface ApiPath {
    String ID_VARIABLE = "id";
    String NAME_VARIABLE = "name";

    String BOOKS = "/books";
    String BOOK = "/{" + ID_VARIABLE + "}";

    String SEARCH = "/search";

    String LOGIN = "/login";

}
