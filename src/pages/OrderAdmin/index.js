import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import OrderDetail from '../../components/OrderDetails';
import {getOrderDetails} from '../../redux/Orders/orders.action';
import ReceipentInfo from "../../customComponent/Receipent";

const mapState = ({ orderHistory }) => ({
    orderDetails: orderHistory.orderDetails
  });
const OrderAdmin = () => {
    const {orderID}= useParams();
     const dispatch=useDispatch();
     const { orderDetails } = useSelector(mapState);
     const { orderTotal } = orderDetails;
     const { recipentCustomer } = orderDetails;
    useEffect(() => {
       
        dispatch(
            getOrderDetails(orderID)
        )

       
    }, [orderID])

   
    return (
        <div>
            <h1>Order ID: #{orderID} </h1>
            <OrderDetail order={orderDetails}/>
            <h3>Total: {orderTotal}</h3>
            <ReceipentInfo recipentCustomer={recipentCustomer}/>
        </div>
    )
}

export default OrderAdmin
