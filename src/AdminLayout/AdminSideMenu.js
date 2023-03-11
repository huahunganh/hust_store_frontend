import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {ExitToApp, Store} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signOut} from "../redux/User/user.actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontSize: '20px'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    text : {
        fontSize: '30px'
    }
}));

function SideMenu({ isOpen, onClose }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickProduct = () => {
        history.push('/productmanagement');
        onClose(true)
    }

    const handleClickOrders = () => {
        history.push('/ordermanagement');
        onClose(true)
    }

    const handleClickDashBoard = () => {
        history.push('/admin');
        onClose(true)
    }


    const handleClickLogOut = () => {
        dispatch(
            signOut()
        )
        onClose(true)
    }

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
                open={isOpen} onClose={onClose}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={handleClickDashBoard}>
                        <ListItemIcon><DashboardIcon fontSize='large' /></ListItemIcon>
                        <ListItemText className={classes.text} primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={handleClickOrders}>
                        <ListItemIcon><ShoppingCartIcon fontSize='large' /></ListItemIcon>
                        <ListItemText className={classes.text} primary="Orders" />
                    </ListItem>
                   <ListItem button onClick={handleClickProduct}>
                       <ListItemIcon><Store fontSize='large'/></ListItemIcon>
                       <ListItemText className={classes.text} primary="Products" />
                   </ListItem>
                    <ListItem button onClick={handleClickLogOut}>
                        <ListItemIcon><ExitToApp fontSize='large'/></ListItemIcon>
                        <ListItemText className={classes.text} primary="SignOut" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default SideMenu;

