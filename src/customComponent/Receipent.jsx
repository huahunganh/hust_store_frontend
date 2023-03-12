import React from 'react'
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: '20px'
    },
}));

const ReceipentInfo = ({ recipentCustomer }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Thông tin giao hàng
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Người nhận:</Typography>
                        <Typography variant="h6">{recipentCustomer.customerName && recipentCustomer.customerName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Mã bưu điện:</Typography>
                        <Typography variant="h6">{recipentCustomer.postalCode && recipentCustomer.postalCode}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Địa chỉ giao hàng:</Typography>
                        <Typography variant="h6">{recipentCustomer.addressLine1 && recipentCustomer.addressLine1}, {recipentCustomer.addressLine2 &&  recipentCustomer.addressLine2}, {recipentCustomer.city && recipentCustomer.city}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Số điện thoại người nhận:</Typography>
                        <Typography variant="h6">{recipentCustomer.phone && recipentCustomer.phone}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ReceipentInfo;
