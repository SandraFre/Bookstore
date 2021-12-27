import * as React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {Link} from "@mui/icons-material";

const Header = () => {
    return (
        <AppBar
            position="static"
            // mode="dark"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography variant="h6"
                            color="inherit"
                            noWrap sx={{flexGrow: 1}}
                >
                    <Link
                        color="text.primary"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}
                        underline="none"
                        // to="/"
                    >
                        Bookstore
                    </Link>
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}
                        // to="/products/create"
                    >
                        Create new product
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Header;