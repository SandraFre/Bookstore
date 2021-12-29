import * as Yup from 'yup';
import {Formik, Form} from "formik";
import {Button, CircularProgress, Container, Paper} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import {useTranslation} from "react-i18next";

const validationSchema = Yup.object().shape({
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

    return (

        <Formik initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: ''
        }}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true);
                }}
                validationSchema={validationSchema}>

            {props => (
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{py: 1, backgroundColor: '#F9EFE5'}}>
                        <Form style={{margin: 50}}>
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
                                            sx={{mt:3}}>
                                        {t('buttons:submit')}</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}