import ProductTypes from './product.types'
import {auth} from './../../firebase/ultils'
import {
    handleAddProduct,
    handleDeleteProduct,
    handleFetchAProduct,
    handleFetchProduct,
    handleUpdateAProduct
} from './product.helper';

export const addProductStart =({
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc   
}) => async dispatch =>{

  try {
  
      const timeStamp = new Date();
     
      await handleAddProduct({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
        productAdminUID: auth.currentUser.uid,
        createdDate :timeStamp
      });
      
       
  } catch (error) {
    //  console.log(error);
  }
};

export const fetchProductStart =(filters={})=> async dispatch =>{

    try {
        
        const products = await handleFetchProduct(filters);

        dispatch({
            type : ProductTypes.SET_PRODUCT,
            payload : products
        })


    } catch (error) {
        console.log(error);
    }
}

export const deleteProductStart = documentID => async dispatch=>{
 if(!documentID) return;
 
 
   try{
     await handleDeleteProduct(documentID);

  }catch(error){
    console.log(error);
  }
}

export const fetchAProductStart = ( id )=> async dispatch =>{
      try {
        const product = await handleFetchAProduct(id);
         dispatch({
           type : ProductTypes.SET_APRODUCT,
           payload :product
         })
        
      } catch (error) {
        console.log(error);
      }
}

export const updateProductStart = ( updateProduct )=> async dispatch =>{
      try {
        const product = await handleUpdateAProduct(updateProduct);
         dispatch({
           type : ProductTypes.SET_APRODUCT,
           payload :product
         })

      } catch (error) {
        console.log(error);
      }
}

