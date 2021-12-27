import HTTP from "./index";

const getBooks = () => HTTP.get('/books');

export {getBooks}