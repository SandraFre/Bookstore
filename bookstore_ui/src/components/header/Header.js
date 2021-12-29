import * as React from "react";
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink, useNavigate} from "react-router-dom";
import {Logout} from "@mui/icons-material";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import SearchBar from "../searchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/slice/userSlice";
import {useTranslation} from "react-i18next";


export default () => {
    const cart = useSelector(state => state.cart);
    const totalItems = cart.reduce((sum, book) => sum + book.count, 0);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {t} = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(removeUser());
        navigate("/")
    }

    return (
        <AppBar position="static"
                color="default"
                sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#F9EFE5'}}>
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
                    {user && user.roles.includes('ADMIN') &&
                        <>
                            <Link
                                variant="body1"
                                color="text.primary"
                                underline="none"
                                sx={{my: 1, mx: 1.5}}
                                component={NavLink}
                                to="/books/create">
                                {t('header:add_new_book')}
                            </Link>
                            <Link
                                variant="body1"
                                color="text.primary"
                                underline="none"
                                component={NavLink}
                                to="/users/registration"
                                sx={{my: 1, mx: 1.5}}
                            >
                                {t('header:create_new_user')}
                            </Link>
                        </>
                    }
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

                {
                    user ?
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{mx: 3}}>
                                    <Avatar sx={{width: 32, height: 32}}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem>
                                    <Avatar/> {user.fullName}
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={onLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    {t('buttons:logout')}
                                </MenuItem>
                            </Menu>
                        </>
                        :
                        <Button variant="outlined"
                                color="inherit"
                                sx={{my: 1, mx: 3}}
                                to="/login"
                                component={NavLink}>
                            {t('buttons:login')}
                        </Button>
                }
                <LanguageSwitcher sx={{ms:5}}/>
            </Toolbar>
        </AppBar>
    )
}

