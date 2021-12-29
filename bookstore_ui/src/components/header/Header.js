import * as React from "react";
import {
    alpha,
    styled,
    AppBar,
    InputBase,
    Link,
    Toolbar,
    Typography,
    MenuItem,
    Avatar,
    Divider,
    ListItemIcon, Tooltip, IconButton, Button
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink} from "react-router-dom";
import {Badge, PersonAdd, Settings} from "@mui/icons-material";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import SearchBar from "../searchBar/SearchBar";
import {useSelector} from "react-redux";


export default () => {
    const cart = useSelector(state => state.cart);
    const totalItems = cart.reduce((sum, book) => sum + book.count, 0);

    return (
        <>
            <AppBar position="static"
                    color="default"
                    sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor:'#e6ebe1'}}>
                <Toolbar sx={{flexWrap: 'wrap'}}>
                    <Typography variant="h6"
                                color="inherit"
                                noWrap sx={{flexGrow: 1}}>
                        <Link color="text.primary"
                              sx={{my: 1, mx: 1.5, fontStyle: 'oblique'}}
                              underline="none"
                              component={NavLink}
                              to="/">
                            Bookstore
                        </Link>
                    </Typography>
                    <SearchBar/>
                    <nav>
                        <Link
                            variant="body1"
                            color="text.primary"
                            underline="none"
                            sx={{my: 1, mx: 1.5}}
                            component={NavLink}
                            to="/books/create">
                            Add new book
                        </Link>
                        <Link
                            variant="body1"
                            color="text.primary"
                            underline="none"
                            component={NavLink}
                            to="/users/registration"
                            sx={{my: 1, mx: 1.5}}
                        >
                            Create new user
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            to="/cart"
                            sx={{my: 1, mx: 1.5}}
                            component={NavLink}
                        >
                            <Badge badgeContent={totalItems} color="primary">
                            <ShoppingCartIcon/>
                            </Badge>
                        </Link>
                    </nav>

                    {/*<Tooltip title="Account settings">*/}
                    {/*    <IconButton*/}
                    {/*        onClick={handleClick}*/}
                    {/*        size="small"*/}
                    {/*        sx={{ml: 2}}>*/}
                    {/*        <Avatar sx={{width: 32, height: 32}}/>*/}
                    {/*    </IconButton>*/}
                    {/*</Tooltip>*/}
                    {/*<Menu*/}
                    {/*    anchorEl={anchorEl}*/}
                    {/*    open={open}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    onClick={handleClose}*/}
                    {/*    PaperProps={{*/}
                    {/*        elevation: 0,*/}
                    {/*        sx: {*/}
                    {/*            overflow: 'visible',*/}
                    {/*            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',*/}
                    {/*            mt: 1.5,*/}
                    {/*            '& .MuiAvatar-root': {*/}
                    {/*                width: 32,*/}
                    {/*                height: 32,*/}
                    {/*                ml: -0.5,*/}
                    {/*                mr: 1,*/}
                    {/*            },*/}
                    {/*            '&:before': {*/}
                    {/*                content: '""',*/}
                    {/*                display: 'block',*/}
                    {/*                position: 'absolute',*/}
                    {/*                top: 0,*/}
                    {/*                right: 14,*/}
                    {/*                width: 10,*/}
                    {/*                height: 10,*/}
                    {/*                bgcolor: 'background.paper',*/}
                    {/*                transform: 'translateY(-50%) rotate(45deg)',*/}
                    {/*                zIndex: 0,*/}
                    {/*            },*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    transformOrigin={{horizontal: 'right', vertical: 'top'}}*/}
                    {/*    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}*/}
                    {/*>*/}
                    {/*    <MenuItem>*/}
                    {/*        /!*<Avatar/> {user.fullName}*!/*/}
                    {/*    </MenuItem>*/}
                    {/*    <Divider/>*/}
                    {/*    <MenuItem>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <PersonAdd fontSize="small"/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        Add another account*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <Settings fontSize="small"/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        Settings*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem onClick={onLogout}>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <Logout fontSize="small"/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        Logout*/}
                    {/*    </MenuItem>*/}
                    {/*</Menu>*/}

                    <Button variant="outlined"
                            color="inherit"
                            sx={{my: 1, mx: 1.5}}
                            to="/login"
                            component={NavLink}>
                        Login
                    </Button>
                    <LanguageSwitcher/>
                </Toolbar>
            </AppBar>
        </>
    )
}

