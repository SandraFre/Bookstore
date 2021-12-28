import * as React from 'react';
import {CssBaseline, GlobalStyles} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Books from "../../pages/Books";
import Book from "../forms/Book";
import UpdateBook from "../forms/UpdateBook";
import BookInfo from "../../pages/BookInfo";


export default () => {
    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Books/>}/>
                <Route path="/books/:bookId" element={<BookInfo/>}/>

                {/*<Route path="/products/create" element={<SecuredRoute/>}>*/}
                    <Route path="/books/create" element={<Book/>}/>
                {/*</Route>*/}
                <Route path="/books/update/:bookId" element={<UpdateBook/>}/>

            </Routes>


        </>
    )
}