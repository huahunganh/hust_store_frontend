import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addProductStart,
    deleteProductStart,
    fetchProductStart,
    updateProductStart
} from './../../redux/Product/product.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/Forms/Forminput';
import FormSelect from './../../components/Forms/FormSelect';
import Button from './../../components/Forms/Button';
import LoadMore from './../../components/LoadMore';
import {CKEditor} from 'ckeditor4-react';

import './style.scss';
import {
    IconButton,
    InputBase,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {makeStyles} from "@material-ui/core/styles";
import DraggableUploadImage from "../../components/ImageUpload";
import {Alert} from "@material-ui/lab";
import {storage} from "../../firebase/ultils";
import {Close, Search} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    cell: {
        fontSize: 16,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: 'none',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.shape.borderRadius,
        marginTop: '10px',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: '2rem',
    },
    notFoundMsg: {
        fontSize: '25px',
        textAlign: 'center',
        paddingTop: '20px'

        },
}));

const ProductManagement = props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [alertAdd, setAlertAdd] = useState(false);
    const [alertRemove, setAlertRemove] = useState(false);
    const [previous, setPrevious] = useState({});
    const [searchItem, setSearchItem] = useState('');


    const lstProduct = useSelector(state => state.product.products);
    const {data, queryDoc, isLastPage} = lstProduct;

    const [updateProduct, setUpdateProduct] = useState(data);

    const onClickEdit = (value) => {
        const exist = updateProduct.find((x) => x.documentID === value.documentID)
        if (exist) {
            setUpdateProduct(
                updateProduct.map((x) => x.documentID === value.documentID ? {...exist, click: exist.click = true} : x)
            );

        }
    }


    const handleUploadAddProduct = (file) => {
        const storageRef = storage.ref('image');
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
                setProductThumbnail(url)
            });


        });

    };

    const handleUpload = (file, name, id) => {
        const storageRef = storage.ref('image');
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
                const newRows = updateProduct.map(row => {
                    if (row.documentID === id) {
                        let updateProduct = {...row, [name]: url}
                        delete updateProduct.click;
                        console.log(updateProduct)
                        dispatch(updateProductStart(updateProduct));
                        return updateProduct;
                    }
                    return row;
                });
                setUpdateProduct(newRows);
            });


        });


    };

    const onChangeHandler = (e, row) => {
        if (!previous[row.documentID]) {
            setPrevious(state => ({...state, [row.documentID]: row}));
        }
        const name = e.target.name;
        const value = e.target.value;
        const {documentID} = row;
        const newRows = updateProduct.map(row => {
            if (row.documentID === documentID) {
                return {...row, [name]: value};
            }
            return row;
        });
        setUpdateProduct(newRows);
        const exist = updateProduct.find((x) => x.documentID === value.documentID);
        if (exist) {
            setUpdateProduct(
                updateProduct.map((x) => x.documentID === value.documentID ? {...exist, [name]: value} : x)
            );
        }
    };

    const onUpdateProduct = (value) => {

        if (value) {
            delete value.click;
        }
        dispatch(updateProductStart(value));

        const exist = updateProduct.find((x) => x.documentID === value.documentID);
        if (exist) {
            setUpdateProduct(
                updateProduct.map((x) => x.documentID === value.documentID ? {...exist, click: exist.click = false} : x)
            );

        }
    }
    const onCallDelete = (value) => {
        dispatch(deleteProductStart(value.documentID));
    }

    const onClickDelete = (value) => {
        const conf = window.confirm('Bạn có muốn xóa sản phẩm này');
        if (conf) {
            onCallDelete(value);

            const newRowList = updateProduct.filter((row) => {
                if (row.documentID === value.documentID) {
                    return false;
                }
                return row;
            });

            setUpdateProduct(newRowList);
            setAlertRemove(true)
        } else {
            return;
        }
    }

    useEffect(() => {
        dispatch(
            fetchProductStart()
        );
        setUpdateProduct(data);
    }, []);

    useEffect(() => {
        setUpdateProduct(data);
    }, [lstProduct]);

    const toggleModal = () => {
        setHideModal(!hideModal)
        if (hideModal) {
            setProductThumbnail("")
        }
    };

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('mens');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setProductDesc('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice,
                productDesc,
            })
        );
        dispatch(
            fetchProductStart()
        );

        setAlertAdd(true)
        resetForm();

    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    return (
        <div className="admin">

            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Thêm mới sản phẩm
                        </Button>
                    </li>
                    <li>
                        <Paper className={classes.root}>
                            <Search fontSize='large' />
                            <InputBase  onChange={event=>{setSearchItem(event.target.value)}}
                                className={classes.input}
                                placeholder='Tìm kiếm sản phẩm'
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Paper>

                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Add new product
                        </h2>

                        <FormSelect
                            label="Category"
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value: "womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput
                            label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />
                        {productThumbnail && <div>
                            <img style={{width: 200, height: 100}} src={productThumbnail}/>
                            <IconButton onClick={() => setProductThumbnail("")}>
                                <Close fontSize='large'/>
                                <Typography style={{fontSize: '15px'}}>xóa ảnh</Typography>
                            </IconButton>
                        </div>}
                        {!productThumbnail && <DraggableUploadImage onUpload={handleUploadAddProduct}/>}

                        <CKEditor
                            onChange={evt => setProductDesc(evt.editor.getData())}
                        />

                        <br/>

                        <Button type="submit">
                            Add product
                        </Button>

                    </form>
                </div>
            </Modal>

            <div className="manageProducts">

                <Table sx={{minWidth: 750}}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>Name</TableCell>
                            <TableCell className={classes.cell}>Category</TableCell>
                            <TableCell className={classes.cell}>Price</TableCell>
                            <TableCell className={classes.cell}>Image</TableCell>
                            <TableCell className={classes.cell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (Array.isArray(updateProduct) && updateProduct.length > 0) && updateProduct
                                .filter((val)=>{
                                    if(searchItem==''){
                                        return val
                                    }else if(val.productName.toLowerCase().includes(searchItem.toLowerCase())){
                                        return val
                                    }
                                }).map((product, index) => {

                                const {
                                    productName,
                                    productThumbnail,
                                    productPrice,
                                    documentID,
                                    productCategory,
                                    click
                                } = product;
                                return (
                                    <TableRow key={documentID}>
                                        <TableCell className={classes.cell}>{click == true ?
                                            <TextField style={{fontSize: '20px'}}
                                                       onChange={e => onChangeHandler(e, product)} name='productName'
                                                       defaultValue={productName}/> : productName}</TableCell>
                                        <TableCell className={classes.cell}>{click == true ?
                                            <FormSelect
                                                options={[{
                                                    value: "mens",
                                                    name: "Mens"
                                                }, {
                                                    value: "womens",
                                                    name: "Womens"
                                                }]}
                                                value={productCategory}
                                                handleChange={e => onChangeHandler(e, product)}
                                            />
                                            : productCategory}
                                        </TableCell>
                                        <TableCell style={{fontWeight: 'bold'}} className={classes.cell}>{click == true ?
                                            <TextField style={{fontSize: '20px'}}
                                                       onChange={e => onChangeHandler(e, product)} name='productPrice'
                                                       defaultValue={productPrice}/> : productPrice} vnđ</TableCell>
                                        <TableCell>
                                            <div>{click ? <DraggableUploadImage id={documentID} name='productThumbnail'
                                                                                onUpload={handleUpload}/> :
                                                <img style={{width: 200, height: 100}} src={productThumbnail}/>}</div>
                                        </TableCell>
                                        <TableCell className={classes.cell}>

                                            <IconButton onClick={() => {
                                                onClickEdit(product)
                                            }}>
                                                <EditIcon fontSize='large'/>
                                            </IconButton>
                                            <IconButton onClick={() => onClickDelete(product)}>
                                                <HighlightOffIcon fontSize='large'/>
                                            </IconButton>
                                            {click == true ? <IconButton onClick={() => {
                                                onUpdateProduct(product)
                                            }}>
                                                Lưu lại
                                            </IconButton> : ''}
                                        </TableCell>
                                    </TableRow>
                                );
                            })

                        }
                        {Array.isArray(updateProduct) && updateProduct.length > 0 && <TableRow>
                            <TableCell>
                                {!isLastPage && (
                                    <LoadMore {...configLoadMore} />
                                )}
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
                <Snackbar open={alertAdd} autoHideDuration={3000} onClose={() => setAlertAdd(false)}>
                    <Alert  onClose={() => setAlertAdd(false)} severity="success">
                        <Typography style={{fontSize:'20px'}}>Đã thêm 1 sản phẩm mới!</Typography>
                    </Alert>
                </Snackbar>

                <Snackbar open={alertRemove} autoHideDuration={3000} onClose={() => setAlertRemove(false)}>
                    <Alert  onClose={() => setAlertRemove(false)} severity="success">
                        <Typography style={{fontSize:'20px'}}>Đã xóa 1 sản phẩm</Typography>
                    </Alert>
                </Snackbar>
            </div>

        </div>
    );
}

export default ProductManagement;