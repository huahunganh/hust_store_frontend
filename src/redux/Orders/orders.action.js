import {auth} from "../../firebase/ultils";
import {handleGetOrderDetail, handleGetOrderHistory, handleGetOrderList, handleSaveOrder} from "./orders.helper";
import ordersTypes from "./orders.type";

export const saveOrderHistory =(order)=> async dispatch=>{
        try {
            const timeStamp = new Date();
            await handleSaveOrder({
                ...order,
                orderUserID: auth.currentUser.uid,
                orderCreatedDate:timeStamp
            });
            dispatch({
                type: ordersTypes.SAVE_ORDER_HISTORY,
                payload:order
            })
        } catch (err) {
            
        }
}

export const fetchUserOrderHistory= (uid)=> async dispatch=>{
    try {
      const order=  await handleGetOrderHistory(uid);
        dispatch({
            type:ordersTypes.SET_USER_ORDER_HISTORY,
            payload: order
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchOrderList= () => async dispatch=>{
    try {
      const orderList =  await handleGetOrderList();
        dispatch({
            type:ordersTypes.SET_USER_ORDER_HISTORY,
            payload: orderList
        })
    } catch (error) {
        console.log(error)
    }
}

export const getOrderDetails= (orderID)=> async dispatch=>{
    try {
        const orderDetails = await handleGetOrderDetail(orderID);
        dispatch({
            type:ordersTypes.SET_ORDER_DETAILS,
            payload:orderDetails
        })
       
    } catch (error) {
        console.log(error);
    }
}
export const clearDataOrderDetails= (orderID)=>  dispatch=>{
    try {
        dispatch({
            type:ordersTypes.RESET_ORDER_DETAILS,
            
        })
       
    } catch (error) {
        console.log(error);
    }
}