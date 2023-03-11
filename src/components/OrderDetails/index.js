import React from 'react'

import {TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'

const columns = [
    {
        id: 'productThumbnail',
        label: 'Ảnh'
    },
    {
        id: 'productName',
        label: 'Tên sản phẩm'
    },
    {
        id: 'productPrice',
        label: 'Giá'
    },
    {
        id: 'quantity',
        label: 'Số lượng'
    }
]

const styles = {
    fontSize: '16px',
    width: '10%'
}

const formatText=(columnName,columnValue)=>{
    switch(columnName){

        case 'productPrice':
            return `$${columnValue}`
        case 'productThumbnail':
            return <img src={columnValue} width={250}/>
        default:
            return columnValue;
    }
}
const OrderDetail = ({ order}) => {

    const {orderItems} =order;
  
    return (
        <TableContainer>
            <TableHead>
                <TableRow>
                    {columns.map((col, pos) => {
                        return (
                            <TableCell
                                key={pos}
                                style={styles}
                            >
                                {col.label}
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {orderItems&&orderItems.map((row, pos) => {
                    return (
                        <TableRow
                            key={pos}
                        >
                            {columns.map((col, pos) => {
                                const columnName= col.id;
                                const columnValue= row[columnName];
                                const formatedText= formatText(columnName,columnValue);
                                return (
                                    <TableCell
                                        key={pos}
                                        style={styles}
                                    >
                                        {formatedText}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>

        </TableContainer>
    )
}

export default OrderDetail
