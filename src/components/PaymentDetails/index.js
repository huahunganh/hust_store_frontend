import React, {useEffect, useState} from 'react'
import FormInput from '../Forms/Forminput'
import Button from '../Forms/Button'
import './style.scss'
import {useDispatch, useSelector} from 'react-redux'
import {clearCart} from '../../redux/Cart/cart.actions'
import {createStructuredSelector} from 'reselect'
import {selectCartItems, selectCartItemsCount, selectCartTotal} from '../../redux/Cart/cart.selectors'
import {useHistory} from 'react-router-dom'
import {saveOrderHistory} from '../../redux/Orders/orders.action'

const initialAddress ={
    line1:'',
    line2:'',
    city:'',
    postal_code:'',
    phone:'',
}

const mapState= createStructuredSelector({
    total: selectCartTotal,
    itemCount : selectCartItemsCount,
    cartItems: selectCartItems
})

const PaymentDetails = () => {

    const history= useHistory();
    const {total,itemCount,cartItems} = useSelector(mapState);

    useEffect(() => {
        if(itemCount<1)
      {
        history.push("/dashboard");
      }
    }, [itemCount])

    const [shippingAddress, setShippingAddress] = useState({...initialAddress});
    const [recipentName, setRecipentName] = useState('');
    const dispatch = useDispatch();
    const handleShipping = evt=>{
        const {name,value}=evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]:value
        });
    };


    const handleFormSubmit = async evt =>{
        evt.preventDefault();

        if(
            !shippingAddress.line1 || !shippingAddress.line2
            || !shippingAddress.postal_code 
            || !shippingAddress.phone
            || !shippingAddress.city
            || !recipentName
        ){
            return;
        }
        const configOrder={
            orderTotal:total,
            orderItems: cartItems.map(item=>{
                const {documentID,productThumbnail
                ,productName,productPrice,quantity
            }=  item;
            return {
                documentID,
                productName,
                productThumbnail,
                productPrice,
                quantity
            }
            }),
            recipentCustomer:{
            customerName:recipentName,
            phone: shippingAddress.phone,
            postalCode: shippingAddress.postal_code,
            city: shippingAddress.city,
            addressLine1: shippingAddress.line1,
            addressLine2:shippingAddress.line2
            }
            
        }
        dispatch(
            saveOrderHistory(configOrder)
        )

        window.alert('Cảm ơn bạn đã đặt hàng!');
        dispatch(clearCart())
        

    }

    return (
        <div className="paymentDest">
            <form onSubmit={handleFormSubmit}>
            <div className="group">
                <h3>
                    Địa chỉ giao hàng
                </h3>

                <FormInput 
                required
                placeholder="Tên người nhận"
                name="recipentName"
                value={recipentName}
                handleChange={evt=>{setRecipentName(evt.target.value)}}
                type="text"
                />
                <FormInput
                required
                placeholder="Số điện thoại"
                name="phone"
                value={shippingAddress.phone}
                handleChange={evt=>handleShipping(evt)}
                type="phone"
                />

                <div className="formRow checkoutInput">
                </div>
                <FormInput 
                required
                placeholder="Thành phố"
                name="city"
                value={shippingAddress.city}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />

                <FormInput 
                required
                placeholder="Postal Code"
                name="postal_code"
                value={shippingAddress.postal_code}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />
                 <FormInput 
                required
                placeholder="Địa chỉ 1"
                name="line1"
                value={shippingAddress.line1}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />

                <FormInput 
                required
                placeholder="Địa chỉ 2"
                name="line2"
                value={shippingAddress.line2}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />
                 <Button type="submit">
               Đặt hàng
           </Button>
            </div>
          
            </form>
        </div>
    )
}

export default PaymentDetails
