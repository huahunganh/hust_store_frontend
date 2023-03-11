import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCartItem,addToCartStart, reducerCartItem } from '../../../redux/Cart/cart.actions';
import deleteIcon from './../../../asset/trash.png'
import plusIcon from  './../../../asset/add.png'
import minusIcon from  './../../../asset/minus.png'

const Item = (product) => {
    const dispatch = useDispatch();
    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (pro) =>{
        dispatch(
            removeCartItem(pro)
        );
    }
    const handleAddProduct =(pro)=>{
            dispatch(addToCartStart(pro))
    }
    const handleReduceProduct =(pro)=>{
        dispatch(reducerCartItem(pro))
}

    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName}/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="removeBtn" onClick={()=>handleReduceProduct(product)} >
                        <img style={{width:'10%',display:'inline' ,margin:'5px 10px 0 0'}} src={minusIcon}/>
                            </span>
                       <span>{quantity}</span>
                       <span className="removeBtn" onClick={()=>handleAddProduct(product)}>
                       <img style={{width:'10%',display:'inline',margin:'5px 0 0 10px'}} src={plusIcon}/>
                           </span>
                    </td>
                    <td>
                        $ {productPrice}
                    </td>
                    <td align="center">
                        <span className="removeBtn" onClick={()=>handleRemoveCartItem(product)}>
                            <img style={{width:'25%'}} src={deleteIcon}/>
                        </span>
                    </td>
                </tr>
            </tbody>
            
        </table>
    )
}

export default Item
