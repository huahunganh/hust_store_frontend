import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router';
import {fetchProductStart} from '../../redux/Product/product.actions';
import FormSelect from '../Forms/FormSelect';
import LoadMore from '../LoadMore';
import Product from './Product';
import './style.scss'
import Paper from "@material-ui/core/Paper";
import {Button, InputBase, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    rootParent: {
        display: 'flex',
    }, root: {
        padding: '2px 4px',
        width: '95.5%',
        display: 'flex',
        boxShadow: 'none',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.shape.borderRadius,
        marginTop: '10px',
        marginLeft: '20px',
    },
    input: {
        padding: '1px 5px',
        marginLeft: theme.spacing(1),
        fontSize: '1.5rem',
    }, textSearch: {
        fontSize: '1.5rem',
        width: '230px',
        padding: '0 5px'
    }, textDate: {
        fontSize: '2rem',
        padding: '0 5px'
    }
}));
const ProductResult = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {filterType}= useParams();
    const lstProducts = useSelector(state=>state.product.products);
    const [searchItem, setSearchItem] = useState('');
    const {data ,queryDoc,isLastPage} = lstProducts;
    const [searchType, setSearchType] = useState('name');
    const [dateFilterType, setDateFilterType] = useState('newest');
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);


    useEffect(()=>{
        dispatch(
            fetchProductStart({ filterType ,pageSize :6})
        )

    },[ filterType])

    const handleFiler = e =>{
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    const handleFilerSearch = e => {
        const nextFilterSearch = e.target.value;
        setSearchType(nextFilterSearch);
    }
    const handleFilerDate = e => {
        const nextFilterDate = e.target.value;
        setDateFilterType(nextFilterDate);
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
    const configFiltersCategory ={
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

    const configFiltersNamePrice ={
        options : [

            {
                name: 'Tên Sản phẩm',
                value :'name'
            },
        {
            name: 'Giá sản phẩm',
            value :'price'
        }


    ],

     handleChange :handleFilerSearch

    }
    const configFiltersDate ={
        options : [

            {
                name: 'Mới nhất',
                value :'newest'
            },
        {
            name: 'Cũ nhất',
            value :'oldest'
        }


    ],

     handleChange :handleFilerDate

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

            <div className="searchDateParent">
                <div className="filterSelect">
                    Danh mục  <FormSelect  {...configFiltersCategory}/>
                </div>
                <div className="filterSelect">
                    Ngày bán <FormSelect  {...configFiltersDate}/>
                </div>
            </div>


            <div className={classes.rootParent}>

                <Paper className={classes.root}>
                    <div className="filterSelectNamePrice">
                       <Typography className={classes.textSearch}> Tìm kiếm theo</Typography>  <FormSelect  {...configFiltersNamePrice}/>
                    </div>
                    {searchType == 'name' ? <InputBase  onChange={event=>{setSearchItem(event.target.value)}}
                                                        className={classes.input}
                                                        placeholder='Nhập tên sản phẩm'
                                                        inputProps={{ 'aria-label': 'search' }}
                    /> : <>
                        <InputBase type='number'  onChange={event=>{setPriceFrom(event.target.value)}}
                                    className={classes.input}
                                    placeholder='Giá từ'
                                    inputProps={{ 'aria-label': 'search' }}
                        />
                        <InputBase type='number' onChange={event=>{setPriceTo(event.target.value)}}
                                    className={classes.input}
                                    placeholder='Đến'
                                    inputProps={{ 'aria-label': 'search' }}
                        /> </>}
                </Paper>
            </div>
            <div className="productResults">
                {data.sort((a, b) => {
                    if (dateFilterType == 'oldest') {
                        return a.createdDate - b.createdDate
                    } else {
                        return b.createdDate - a.createdDate
                    }
                }).filter((val) => {
                   if (searchType =='name') {
                       if (searchItem == '') {
                           return val
                       } else if (val.productName.toLowerCase().includes(searchItem.toLowerCase())) {
                           return val
                       }
                   } else {
                        if (priceFrom >= 0 && priceTo <= 0 && parseInt(val.productPrice) >= priceFrom) {
                           return val
                       } else if (priceFrom <= 0 && priceTo >= 0 && parseInt(val.productPrice) <= priceTo) {
                           return val
                       } else if (priceFrom >= 0 && priceTo >= 0 && parseInt(val.productPrice) >= priceFrom && parseInt(val.productPrice) <= priceTo) {
                           return val
                       }
                   }
                }).map((product,pos)=>{
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
