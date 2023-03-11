import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router';
import {fetchProductStart} from '../../redux/Product/product.actions';
import FormSelect from '../Forms/FormSelect';
import LoadMore from '../LoadMore';
import Product from './Product';
import './style.scss'

const ProductResult = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {filterType}= useParams();
    const lstProducts = useSelector(state=>state.product.products);
    const {data ,queryDoc,isLastPage} = lstProducts;
    useEffect(()=>{
        dispatch(
            fetchProductStart({ filterType ,pageSize :6})
        )

    },[ filterType])

    const handleFiler = e =>{
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    if(!Array.isArray(data)) return null;
    
    if(data.length < 1){
        return(
            <div>
                <p>
                    No search result!
                </p>
            </div>
        )
    }
    const configFilters ={
        defaultValue : filterType,
        options : [{
            name: 'Tất cả',
            value: ''
        },
        {
            name: 'Nam',
            value :'mens'
        },
        {
            name: 'Nữ',
            value :'womens'
        }
    
    
    ],
     
     handleChange :handleFiler

    }
    const handleLoadMore= ()=>{
        dispatch(
            fetchProductStart({ filterType  ,startAfterDoc: queryDoc
            ,persistProducts : data
            })
        )
    }

    const configLoadMore ={
        onLoadMoreEvt : handleLoadMore,
    }



    return (
        <div className="products">

            <h1>
                Sản phẩm
            </h1>
           <div className="filterSelect">
           <FormSelect  {...configFilters}/>
           </div>
            <div className="productResults">
            {data.map((product,pos)=>{
                const {productName,
                    productThumbnail,
                    productPrice,
                    documentID,
                    
                } = product;
                if (!productName || !productThumbnail ||
                   typeof productPrice == 'undefined') return null;

                    const configProduct ={
                        productName,
                    productThumbnail,
                    productPrice,
                    documentID,
                    pos
                    }
                return(
                   
                        <Product {...configProduct} key={pos}/>
                 
                )
            })}
            {!isLastPage && (
            <LoadMore {...configLoadMore}/>
            )}
            </div>

            
        </div>
    )
}

export default ProductResult
