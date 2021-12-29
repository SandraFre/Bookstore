import {Alert, Box, Button, CircularProgress, Container, Divider, Grid, Paper} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteBook, getBookById, getBooks, updateBook} from "../api/bookApi";
import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../store/slice/cartSlice";

export default () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const dispatcher = useDispatch();
    const onAddBookToCart = (book) => dispatcher(addToCart(book));

    useEffect(() => {
        getBookById(bookId)
            .then(({data}) => setBook(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const onDeleteBook = (id) => {
        deleteBook(id)
            .then(({status}) => {
                if (status === 204) {
                    navigate('/');
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something is wrong', severity: 'error'}))

    }

    return (
        <>
            {
                notification.isVisible &&
                <Alert severity={notification.severity} sx={{width: '100%'}}>
                    {notification.message}
                </Alert>
            }
            {loading ?
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress color="inherit"/>
                </Box>
                :
                <Container maxWidth="md" sx={{my: 5}}>
                    <Paper elevation={3} sx={{py: 1, px: 5, backgroundColor: '#e6ebe1'}}>
                        <h1>{book.title}</h1>
                        <h3>{book.author}</h3>
                        <p><span sx={{ fontStyle: 'italic' }}>Information</span><br/>
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
                                {user && user.roles.includes('ADMIN') &&
                                    <>
                                    <Button color="inherit"
                                            component={NavLink}
                                            to={`/books/update/${book.id}`}>Update</Button>
                                    <Button color="inherit"
                                    onClick={()=>onDeleteBook(book.id)}
                                    >Delete</Button>
                                    </>
                                }
                            </Grid>
                            <Grid item>
                                <Button variant="outlined"
                                        color="inherit"
                                        size="small"
                                        onClick={() => onAddBookToCart(book)}>
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