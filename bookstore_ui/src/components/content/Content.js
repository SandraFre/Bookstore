import * as React from 'react';
import {CssBaseline, GlobalStyles} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Books from "../../pages/Books";


export default () => {
    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Books/>}/>
            </Routes>


        </>
    )
}