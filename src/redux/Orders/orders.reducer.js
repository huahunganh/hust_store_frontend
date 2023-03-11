import ordersTypes from "./orders.type";


const INITIAL_STATE={
    orderHistory:[],
    orderDetails:{},
}

const orderReducer =(state=INITIAL_STATE,action)=>{
        switch (action.type) {
            case ordersTypes.SET_USER_ORDER_HISTORY:
                return {
                    ...state,
                    orderHistory: action.payload
                }

            case ordersTypes.SET_ORDER_DETAILS:
                return {
                    ...state,
                    orderDetails: action.payload
                }
            case ordersTypes.RESET_ORDER_DETAILS:
                return {
                    state
                }
        
            default:
                return state;
        }
}

export default orderReducer