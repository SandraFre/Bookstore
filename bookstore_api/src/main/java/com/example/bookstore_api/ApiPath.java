package com.example.bookstore_api;

public interface ApiPath {
    String ID_VARIABLE = "id";
    String NAME_VARIABLE = "name";

    String BOOKS = "/books";
    String BOOK = "/{" + ID_VARIABLE + "}";

    String SEARCH = "/search";

    String FILES = "/files";
    String FILE_BY_NAME = "/{" + NAME_VARIABLE + "}";
    String BLOBS = "/blobs";
    String GET_BLOB = BLOBS + "/{" + ID_VARIABLE + "}";

    String LOGIN = "/login";

}
