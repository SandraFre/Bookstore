import * as React from 'react';
import {CssBaseline, GlobalStyles} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Books from "../../pages/Books";
import Book from "../forms/Book";
import UpdateBook from "../forms/UpdateBook";
import BookInfo from "../../pages/BookInfo";
import SecuredRoute from "../security/SecuredRoute";
import Cart from "../../pages/Cart";
import Login from "../forms/Login";
import RegistrationForm from "../forms/RegistrationForm";


export default () => {
    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Books/>}/>

                <Route path="/books/:bookId" element={<BookInfo/>}/>

                <Route path="/books/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/books/create" element={<Book/>}/>
                </Route>

                <Route path="/books/update/:bookId" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/books/update/:bookId" element={<UpdateBook/>}/>
                </Route>

                <Route path="/users/registration" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/users/registration" element={<RegistrationForm/>}/>
                </Route>

                    <Route path="/cart" element={<Cart/>}/>


                <Route path="/login" element={<Login/>}/>

            </Routes>


        </>
    )
}