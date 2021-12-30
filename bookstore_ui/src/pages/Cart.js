import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart, removeOneFromCart} from "../store/slice/cartSlice";
import {
    Alert,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTranslation} from "react-i18next";

export default () => {
    const books = useSelector(state => state.cart);
    const totalSum = (books.reduce((sum, book) => sum + book.price * book.count, 0)).toFixed(2);

    const user = useSelector(state => state.user.user);

    const {t} = useTranslation();

    const dispatcher = useDispatch();
    const onAddBookToCart = (book) => dispatcher(addToCart(book));
    const onRemoveOneItemFromCart = (book) => dispatcher(removeOneFromCart(book));
    const onRemoveBook = (id) => dispatcher(removeFromCart(id));

    return (
        <Container maxWidth="md" sx={{my: 5}}>
            {books.length === 0 ?
                <Alert severity="info">Cart is empty! </Alert>
                :
                <TableContainer component={Paper} sx={{backgroundColor: '#F9EFE5', p:3}}>
                    <Table sx={{minWidth: 100}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight:'bold'}}>{t('books:title')}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>{t('books:author')}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}align="center">{t('books:quantity')}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}} align="right">{t('books:price')}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}} align="right">{t('cart:subtotal')}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book.id}
                                          sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="inherit" size="small" sx={{mx:2}}
                                        onClick={()=>onRemoveOneItemFromCart(book)}
                                                disabled={book.count===0}
                                        >-</Button>
                                        {book.count}
                                        <Button variant="outlined" color="inherit" size="small" sx={{mx:2}}
                                                onClick={() => onAddBookToCart(book)}
                                        >+</Button>
                                    </TableCell>
                                    <TableCell align="right">{book.price}</TableCell>
                                    <TableCell align="right">{book.price * book.count}</TableCell>
                                    <TableCell>
                                        <Button color="secondary"
                                                onClick={() => onRemoveBook(book.id)}>
                                            <DeleteOutlineIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold"}}>{t('cart:total')}</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold"}}>{totalSum}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            {
                                user &&
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                    <Button variant="outlined"
                                            color="inherit"
                                            size="small"
                                    sx={{my:2}}>
                                        {t('buttons:checkout')}
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Container>
    )
}