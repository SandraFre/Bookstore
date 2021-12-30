import * as Yup from 'yup';
import {Formik, Form} from "formik";
import {Alert, Button, CircularProgress, Container, Paper, Typography} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {createUser} from "../../api/bookApi";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required(),
    name: Yup.string()
        .required(),
    surname: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required()
        .min(5, 'Value must be more than 5 symbols'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default () => {

    const {t} = useTranslation();

    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});

    const onRegisterUser = (user, helpers) => {
        createUser(user)
            .then(({status}) => {
                if (status === 200) {
                    setNotification({isVisible: true, message: 'User created successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something is wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik initialValues={{
            username: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={onRegisterUser}
                validationSchema={validationSchema}>

            {props => (
                <Container maxWidth="sm" sx={{my:5}}>
                    <Paper elevation={3} sx={{py: 1, backgroundColor: '#F9EFE5'}}>
                        {
                            notification.isVisible &&
                            <Alert severity={notification.severity} sx={{width: '100%'}}>
                                {notification.message}
                            </Alert>
                        }
                        <Form style={{margin: 50}}>
                            <TextFieldInput error={props.touched.username && !!props.errors.username}
                                            fieldName="username"
                                            label="Username:"
                                            placeholder="Type username here..."/>
                            <TextFieldInput error={props.touched.name && !!props.errors.name}
                                            fieldName="name"
                                            label="Name:"
                                            placeholder="Type name here..."/>
                            <TextFieldInput error={props.touched.surname && !!props.errors.surname}
                                            fieldName="surname"
                                            label="Surname:"
                                            placeholder="Type surname here..."/>
                            <TextFieldInput error={props.touched.email && !!props.errors.email}
                                            fieldName="email"
                                            label="Email:"
                                            placeholder="Type email here..."/>
                            <TextFieldInput error={props.touched.password && !!props.errors.password}
                                            fieldName="password"
                                            label="Password:"
                                            type="password"
                                            placeholder="Type password here..."/>
                            <TextFieldInput error={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                            fieldName="repeatPassword"
                                            label="Repeat password:"
                                            type="password"
                                            placeholder="Repeat Password here..."/>

                            {
                                props.isSubmitting ? <CircularProgress color="inherit"/> :
                                    <Button type="submit"
                                            color="inherit"
                                            variant="outlined"
                                            sx={{mt: 3}}>
                                        {t('buttons:submit')}</Button>
                            }
                            <p><Typography variant="subtitle2"
                                           component={NavLink}
                                           to="/login"
                            >{t('login:login_here')}</Typography></p>
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}