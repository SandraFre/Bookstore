import * as Yup from 'yup';
import {useState} from "react";
import {Form, Formik} from "formik";
import {createBook} from "../../api/bookApi";
import {Alert, Button, CircularProgress, Container, Paper} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import {useTranslation} from "react-i18next";

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

    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});

    const {t} = useTranslation();

    const onCreateBook = (book, helpers) => {
        createBook(book)
            .then(({status}) => {
                if (status === 201) {
                    setNotification({isVisible: true, message: 'Book added successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something is wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik initialValues={{
            title: '',
            author: '',
            category: '',
            year: '',
            quantity: '',
            price: ''
        }}
                onSubmit={onCreateBook}
                validationSchema={validationSchema}
        >
            {props => (
                <Container maxWidth="sm" sx={{my: 5}}>
                    <Paper elevation={3} sx={{py: 1, backgroundColor: '#F9EFE5'}}>
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
                                    <Button type="submit"
                                            variant="outlined"
                                            color="inherit"
                                            sx={{mt: 3}}>
                                        {t('buttons:submit')}</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}