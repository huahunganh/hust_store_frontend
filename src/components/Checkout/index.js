import React from 'react'
import './style.scss'
import {createStructuredSelector} from 'reselect'
import {selectCartItems, selectCartTotal} from '../../redux/Cart/cart.selectors'
import {useSelector} from 'react-redux';
import Button from './../Forms/Button'
import Item from './Item';
import {useHistory} from 'react-router';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total : selectCartTotal
});

const Checkout = ({ }) => {

    const { cartItems, total } = useSelector(mapState);
    const history = useHistory();

    return (
        <div className="checkout">
            <h1>Giỏ hàng</h1>

            <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  {cartItems.map((item, pos) => {
                    return (
                      <tr>
                        <td key={pos}>
                          <Item {...item} />
                        </td>
                      </tr>
                    )
                  })}
                </table>
              </tr>
              <tr>
                <table align="left" border="0" cellPadding="10" cellSpacing="0">
                  <tr align="left">
                    <td>
                      <h3>
                        Total: {total} $
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <table border="0" cellPadding="10" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={()=>history.push("/search")}>
                              Tiếp tục mua sắm
                            </Button>
                          </td>
                          <td>
                            <Button onClick={()=>history.push("/payment")}>
                              Tiến hành đặt hàng
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
            <p>
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
          )}
      </div>
        </div>
    )
}

export default Checkout
