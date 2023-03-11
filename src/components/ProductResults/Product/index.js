import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {addToCartStart} from '../../../redux/Cart/cart.actions'
import Button from './../../Forms/Button'
import {Alert} from "@material-ui/lab";
import {Snackbar, Typography} from "@material-ui/core";

const Product = (product) => {
    const dispatch = useDispatch();
    const  [alert, setAlert] = useState(false);
    const {
        documentID,
        productName,
        productThumbnail,
        productPrice
    } = product;
const history = useHistory();
const configAddCartBtn = {
    type : 'button'
}
    if(!documentID || !productName || !productThumbnail ||
        typeof productPrice === 'undefined') return null;

        const handleAddToCart =(productt)=>{
            if(!productt) return;
            dispatch(addToCartStart(productt))
            setAlert(true)
        };

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                <img style={{height:'220px'}} src={productThumbnail} alt={productName}/>
                </Link>
            </div>

            <div >
                <ul style={{padding:0}} >
                    <li style={{margin:"10px 0"}}>
                        <span className="name">
                        <Link to={`/product/${documentID}`}>
                            {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                           $ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div style={{marginTop:'10px',width:''}} className="addToCart">
                        <Button {...configAddCartBtn} onClick={()=>handleAddToCart(product)}>
                            Thêm vào giỏ hàng
                        </Button>
                        </div>
                    </li>
                </ul>
            </div>
            <Snackbar open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
                <Alert  onClose={() => setAlert(false)} severity="success">
                    <Typography style={{fontSize:'20px'}}>Đã thêm vào giỏ hàng</Typography>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Product
