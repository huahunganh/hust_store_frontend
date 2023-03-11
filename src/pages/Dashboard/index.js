import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import OrderHistory from '../../components/OrderHistory';
import {fetchUserOrderHistory} from '../../redux/Orders/orders.action';

import './style.scss';

const Dashboard = ({props}) => {

    const dispatch = useDispatch();
    const currentUser= useSelector(state=>state.user.currentUser);
    useEffect(() => {
        dispatch(
            fetchUserOrderHistory(currentUser.id)
        );
    }, [])
   
    const lstOrders= useSelector(state=>state.orderHistory.orderHistory);
    return (
       <>
        <h1>Lịch sử đặt hàng</h1>
        <OrderHistory orders={lstOrders}/>
       </>
    )
}

export default Dashboard
