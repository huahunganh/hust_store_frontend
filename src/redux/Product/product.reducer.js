
import ProductTypes from './product.types';


const INITIAL_STATE ={
    productData :null,
    products: [],
    product : {}
}

const productReducer = (state=INITIAL_STATE,action ) => {

                switch (action.type) {
                    case ProductTypes.ADD_NEW_PRODUCT:
                        return{
                            ...state,
                            productData: action.payload
                        }
                    case ProductTypes.SET_PRODUCT:
                        return{
                            ...state,
                            products: action.payload
                        }
                    case ProductTypes.SET_APRODUCT :
                        return{
                            ...state,
                            product : action.payload
                        }
                               
                        
                
                    default:
                        return state;
                }


}

export default productReducer
