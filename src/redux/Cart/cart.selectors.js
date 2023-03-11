import {createSelector} from 'reselect'


 export const selectorCartData = state => state.cartData;

export  const selectCartItems = createSelector(
    [selectorCartData],
    cartData =>cartData.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (quantity , cartItem) =>
        quantity + cartItem.quantity
        ,0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (quantity, cartItem) =>
        quantity + cartItem.quantity * cartItem.productPrice,
        0
    )
)