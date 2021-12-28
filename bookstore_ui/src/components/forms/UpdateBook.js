import {useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import {Alert, Box, Button, CircularProgress, Container, Paper} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {createBook, getBookById, updateBook} from "../../api/bookApi";
import * as React from "react";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(),
    author: Yup.string()
        .required(),
    category: Yup.string()
        .required(),
    year: Yup.string()
        .required()
        .min(3, 'Value must be 3 symbols at least')
        .max(4, 'Value must be 4 symbols at most'),
    quantity: Yup.number()
        .required()
        .typeError('Must be a number')
        .positive(),
    price: Yup.number()
        .required()
        .typeError('Must be a number')
        .positive()
})

export default () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});

    const onUpdateBook = (book, helpers) => {
        updateBook(book)
            .then(({status}) => {
                if (status === 202) {
                    setNotification({isVisible: true, message: 'Book updated successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something is wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

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
                <Formik
                    initialValues={{
                        id: book?.id,
                        title: book?.title || '',
                        author: book?.author || '',
                        category: book?.category || '',
                        year: book?.year || '',
                        quantity: book?.quantity ||  '',
                        price: book?.price ||  ''
                    }}
                    onSubmit={onUpdateBook}
                    validationSchema={validationSchema}>
                    {props => (
                        <Container maxWidth="sm" sx={{my: 5}}>
                            <Paper elevation={3} sx={{py: 1, backgroundColor: '#e6ebe1'}}>
                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity} sx={{width: '100%'}}>
                                        {notification.message}
                                    </Alert>
                                }
                                <Form style={{margin: 50}}>
                                    <TextFieldInput error={props.touched.title && props.errors.title}
                                                    fieldName="title"
                                                    label="Title:"/>
                                    <TextFieldInput error={props.touched.author && props.errors.author}
                                                    fieldName="author"
                                                    label="Author:"/>
                                    <TextFieldInput error={props.touched.category && props.errors.category}
                                                    fieldName="category"
                                                    label="Category:"/>
                                    <TextFieldInput error={props.touched.year && props.errors.year}
                                                    fieldName="year"
                                                    label="Year:"/>
                                    <TextFieldInput error={props.touched.quantity && props.errors.quantity}
                                                    fieldName="quantity"
                                                    label="Quantity:"/>
                                    <TextFieldInput error={props.touched.price && props.errors.price}
                                                    fieldName="price"
                                                    label="Price:"/>
                                    {
                                        props.isSubmitting ? <CircularProgress color="inherit"/> :
                                            <Button type="submit" variant="outlined" color="inherit"
                                                    sx={{mt: 3}}>Update</Button>
                                    }
                                </Form>
                            </Paper>
                        </Container>
                    )}
                </Formik>
            }
        </>
    )
}