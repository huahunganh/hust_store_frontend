import React from 'react';
import './style.scss'
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const AdminLayout = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">Chào mừng đến với trang quản lý Hung Anh STORE</Typography>
                        <Typography variant="subtitle1">Dễ dàng hơn với HUA HUNG ANH</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Quản lý đơn hàng</Typography>
                        <Typography variant="subtitle1">Xem các thông tin đơn hàng đã nhận!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Quản lý sản phẩm</Typography>
                        <Typography variant="subtitle1">Quản lý sản phẩm được bán trên trang</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminLayout;