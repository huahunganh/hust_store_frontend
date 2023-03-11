import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import moment from 'moment';
import {useHistory} from 'react-router-dom';

const collumns = [
    {
        id: 'orderCreatedDate',
        label: 'Ngày đặt'
    },
    {
        id: 'documentID',
        label: 'ID'
    },
    {
        id: 'orderTotal',
        label: 'Thành tiền'
    }

]

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
}
const formatText = (columnName, columnValue) => {
    switch (columnName) {
        case 'orderTotal':
            return `$${columnValue}`;
        case 'orderCreatedDate':
            return moment(columnValue.nano).format('DD/MM/YYYY');

        default:
            return columnValue;
    }
};
const OrderHistoryAdmin = ({ orders }) => {
    const { data } = orders;
    const history=useHistory();
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {collumns.map((column, pos) => {
                            const { label } = column;
                            return (
                                <TableCell
                                    key={pos}
                                    style={styles}
                                >
                                    {label}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data !== 'null' && data !== 'undefined'? data.map((row, pos) => {
                        const {documentID}=row;
                        return (
                            <TableRow 
                            key={pos}
                            onClick={()=>history.push(`/orderadmin/${documentID}`)}
                            >
                                {collumns.map((column, pos) => {
                                    const columnName = column.id;
                                    const columnValue = row[columnName];
                                    const formattedText = formatText(columnName, columnValue);

                                    return (
                                        <TableCell
                                            key={pos}
                                            style={styles}
                                        >
                                            {formattedText}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    }):<h1>Chưa có đơn hàng </h1>}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default OrderHistoryAdmin
