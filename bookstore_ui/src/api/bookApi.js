import HTTP from "./index";

const getBooks = () => HTTP.get('/books');
const createBook = (data) => HTTP.post('/books', data)

export {getBooks, createBook}