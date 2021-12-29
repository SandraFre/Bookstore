import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "../store/slice/cartSlice";
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

export default () => {
    const books = useSelector(state => state.cart);
    const dispatcher = useDispatch();
    const onRemoveBook = (id) => dispatcher(removeFromCart(id));

    return (
        <Container maxWidth="md" sx={{my: 2}}>
            {books.length === 0 ?
                <Alert severity="info">Cart is empty! </Alert>
                :
                <TableContainer component={Paper} sx={{backgroundColor: '#F9EFE5'}}>
                    <Table sx={{minWidth: 100}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book.id}
                                          sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell align="right">{book.count}</TableCell>
                                    <TableCell align="right">{book.price}</TableCell>
                                    <TableCell align="right">{book.price * book.count}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="error"
                                                onClick={() => onRemoveBook(book.id)}>
                                            <DeleteOutlineIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold"}}>Total</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold"}}>111111</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            }
        </Container>
    )
}