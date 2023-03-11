import CartTypes from './cart.types'

export const addToCartStart = (nextCartItem)=> async dispatch =>{
            try {
                dispatch({
                    type: CartTypes.ADD_TO_CART,
                    payload : nextCartItem
                })
                
            } catch (error) {
                console.log(error);
            }
}

export const removeCartItem =(cartItem ) => async dispatch =>{
     try {
        dispatch({
            type : CartTypes.REMOVE_CART_ITEM,
            payload : cartItem
        })
     } catch (error) {
            console.log(error);
     }
}
 export const reducerCartItem = (cartItem) => async dispatch =>{
    try {
        dispatch({
            type : CartTypes.REDUCE_CART_ITEM,
            payload : cartItem
        })
     } catch (error) {
            console.log(error);
     }
 }

 export const clearCart = () => async dispatch=>{
            dispatch({
                type: CartTypes.CLEAR_CART
            })
 }
