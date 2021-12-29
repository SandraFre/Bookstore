import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../api/userApi";
import {addUser} from "../../store/slice/userSlice";
import {Alert, Button, Container, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import TextFieldInput from "./TextFieldInput";

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required(),
    password: Yup.string().required()
})

export default () => {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (loginData, helpers) => {
        login(loginData)
            .then(({data, headers}) => {
                dispatch(addUser({
                    user: data,
                    jwtToken: headers.authorization
                }));
                navigate('/')
            })
            .catch((response) => setError(true))
            .finally(() => helpers.setSubmitting(false));
    }


    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={onLogin}
            validationSchema={loginValidationSchema}>

            {props => (
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{py: 1, backgroundColor: '#e6ebe1'}}>
                        {
                            error &&
                            <Alert severity="error" sx={{width: '100%'}}>
                                Bad credentials
                            </Alert>
                        }
                        <Form>
                            <TextFieldInput
                                error={props.touched.username && !!props.errors.username}
                                fieldName="username"
                                label="Username"/>
                            <TextFieldInput
                                error={props.touched.password && !!props.errors.password}
                                fieldName="password"
                                label="Password"
                                type="password"/>
                            <Button variant="outlined"
                                    type="submit"
                                    disabled={props.isSubmitting}>
                                Login </Button>
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}