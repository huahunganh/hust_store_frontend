import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchOrderList} from '../../redux/Orders/orders.action';
import OrderHistoryAdmin from "../../components/OrderHistoryAdmin";


const OrderManagement = ({props}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchOrderList()
        );
    }, [])

    const lstOrders= useSelector(state=>state.orderHistory.orderHistory);
    return (
        <>
            <h1>Danh sách đặt hàng</h1>
            <OrderHistoryAdmin orders={lstOrders}/>
        </>
    )
}

export default OrderManagement
