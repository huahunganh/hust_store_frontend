import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {signOut} from '../../redux/User/user.actions';
import logo from './../../asset/logo.png';
import {selectCartItemsCount} from './../../redux/Cart/cart.selectors';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Badge, IconButton, Menu, MenuItem} from '@material-ui/core';

import './style.scss';
import {AccountCircle} from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const mapState = (state) => ({
    totalNumCartItems: selectCartItemsCount(state)
});

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: theme.spacing(1),
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
    },
    title: {
        color: theme.palette.common.black,
        display: 'flex',
        alignItems: 'center',
        paddingRight: '10px'
    },
    logo: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(3),
    },
    menuButton: {
        color: theme.palette.common.black,
        '&:hover': {
            backgroundColor: 'lightcyan',
        },
        '&:hover > $title': {
            textDecoration: 'underline',
        },
        marginRight: theme.spacing(1),
    },
    menuItem: {
        color: theme.palette.common.black,
        fontSize: '22px',

    },
}));

const Header = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { totalNumCartItems } = useSelector(mapState);

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);

        const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setAnchorEl(null);
    };

    const handleLogin = () => {
        history.push('/login')
        setAnchorEl(null);
    };

    const handleRegister = () => {
        history.push('/registration')
        setAnchorEl(null);
    };

    const handleDashboard = () => {
        history.push('/dashboard')
        setAnchorEl(null);
    };

    const logout = () => {
        const cnf = window.confirm('Bạn có muốn đăng xuất?');
        if(cnf==false){
            return;
        }else{
            dispatch(signOut()).then(() =>{
                history.push('/login')
            });
        }

        setAnchorEl(null);

    }
    const unLoged = () => (
        <>
            <Link to='/search'>
                <IconButton className={classes.menuButton} aria-label="Products">
                    <span className={classes.title}>Products</span>
                </IconButton>
            </Link>
            <IconButton
                className={classes.menuButton}
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircle fontSize="large"/>
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.menuItem} onClick={handleLogin}>
                    Đăng nhập
                </MenuItem>

                <MenuItem className={classes.menuItem} onClick={handleRegister}>
                    Đăng kí
                </MenuItem>
            </Menu>
            <Link to="/cart">
                <IconButton style={{marginRight:'10px'}} aria-label="cart">
                    <StyledBadge badgeContent={totalNumCartItems} color="secondary">
                        <ShoppingCartIcon fontSize="large" />
                    </StyledBadge>
                </IconButton>
            </Link>
        </>
    );
    const Loged = () => (
        <>
            <Link to='/search'>
                <IconButton className={classes.menuButton} aria-label="Products">
                    <span className={classes.title}>Products</span>
                </IconButton>
            </Link>
            <IconButton
                className={classes.menuButton}
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.menuItem} onClick={logout}>
                    Đăng xuất
                </MenuItem>

                <MenuItem className={classes.menuItem} onClick={handleDashboard}>
                    Lịch sử đặt hàng
                </MenuItem>
            </Menu>
            <Link to="/cart">
                <IconButton style={{marginRight:'10px'}} aria-label="cart">
                    <StyledBadge badgeContent={totalNumCartItems} color="secondary">
                        <ShoppingCartIcon fontSize="large" />
                    </StyledBadge>
                </IconButton>
            </Link>
        </>
    );
    return (
            <header className={classes.header}>
                <div className={classes.title}>
                    <Link to="/"> <img className={classes.logo} style={{width:'60%',height:'auto', paddingBottom: '10px', paddingTop: '10px'}} src={logo} alt="hust Logo" /></Link>
                    <Link to="/"> <h2>Hung Anh STORE</h2></Link>
                </div>
                <div>
                    {!currentUser ? unLoged() : Loged()}
                </div>
            </header>
    )
}
export default Header