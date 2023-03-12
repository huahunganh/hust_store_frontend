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
    const {customerName, postalCode, addressLine1, addressLine2, city, phone} = recipentCustomer;
    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Thông tin giao hàng
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Người nhận:</Typography>
                        <Typography variant="h6">{customerName && customerName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Mã bưu điện:</Typography>
                        <Typography variant="h6">{postalCode && postalCode}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Địa chỉ giao hàng:</Typography>
                        <Typography variant="h6">{addressLine1 && addressLine1}, {addressLine2 &&  addressLine2}, {city && city}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">Số điện thoại người nhận:</Typography>
                        <Typography variant="h6">{phone && phone}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ReceipentInfo;
