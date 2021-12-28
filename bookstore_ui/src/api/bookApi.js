import HTTP from "./index";

const getBooks = () => HTTP.get('/books');
const createBook = (data) => HTTP.post('/books', data);
const getBookById = (id) => HTTP.get(`/books/${id}`);
const updateBook = (data) =>HTTP.put('/books', data);

export {getBooks, createBook, getBookById, updateBook}