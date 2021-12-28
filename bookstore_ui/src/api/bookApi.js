import HTTP from "./index";

const getBooks = () => HTTP.get('/books');
const createBook = (data) => HTTP.post('/books', data);
const getBookById = (id) => HTTP.get(`/books/${id}`);
const updateBook = (data) => HTTP.put('/books', data);
const deleteBook = (id) => HTTP.delete(`/books/${id}`);

export {getBooks, createBook, getBookById, updateBook, deleteBook}