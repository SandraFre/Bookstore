import * as React from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {getBooks} from "../api/bookApi";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../store/slice/cartSlice";


const Books = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector(state => state.user.user);

    const dispatcher = useDispatch();
    const onAddBookToCart = (book) => dispatcher(addToCart(book));

    useEffect(() => {
        getBooks()
            .then(({data}) => setBooks(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <Container maxWidth="md" sx={{my: 5}}>
            {loading ?
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress color="inherit"/>
                </Box>
                :
                <>
                    <h1>All books</h1>
                    <Grid container spacing={3}>
                        {books.map((book) => (
                            <Grid item xs={4}
                                  key={book.id}>
                                <Paper elevation={3}>
                                    <Card sx={{backgroundColor: '#e6ebe1'}}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {book.title}
                                            </Typography>
                                            <Typography variant="subtitle1" component="div">
                                                {book.author}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Category: {book.category}
                                            </Typography>
                                             {user && user.roles.includes('ADMIN') &&
                                            <Typography variant="body2" color="text.secondary">
                                                Qty: {book.quantity}
                                            </Typography>
                                            }
                                            <Typography variant="subtitle1" sx={{fontWeight: "bold", my: 2}}>
                                                Price: {book.price} Eur
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{justifyContent: "space-between"}}>
                                            <Button variant="outlined"
                                                    color="inherit"
                                                    size="small"
                                                    component={NavLink}
                                                    to={`/books/${book.id}`}>
                                                More info
                                            </Button>
                                            <Button variant="outlined"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => onAddBookToCart(book)}>
                                                <AddShoppingCartIcon/>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </Container>
    )
}

export default Books;