import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import Container from "@mui/material/Container";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                My Bookstore App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default () => {
    return (
        <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
            }}
        >
            <Copyright sx={{mt: 5}}/>
        </Container>
    )
}