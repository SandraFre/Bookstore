import {Box, Button, CircularProgress, Container, Divider, Grid, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBookById} from "../api/bookApi";
import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookById(bookId)
            .then(({data}) => setBook(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ?
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress color="inherit"/>
                </Box>
                :
                <Container maxWidth="md" sx={{my: 5}}>
                    <Paper elevation={3} sx={{py: 1, px: 5, backgroundColor: '#e6ebe1'}}>
                        <h1>{book.title}</h1>
                        <h3>{book.author}</h3>
                        <p><span sx={{fontStyle: 'italic'}}>Information</span><br/>
                            category: {book.category},<br/>
                            year of publication: {book.year},<br/>
                            quantity: {book.quantity},<br/>
                            price: {book.price} Eur<br/>
                        </p>

                        <Divider variant="middle"/>

                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center" sx={{mt: 3, mb: 1}}>
                            <Grid item>
                                <Button color="inherit">Update</Button>
                                <Button color="inherit">Delete</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined"
                                        color="inherit"
                                        size="small">
                                    <AddShoppingCartIcon/>
                                </Button>
                            </Grid>

                        </Grid>

                    </Paper>
                </Container>
            }
        </>
    )
}