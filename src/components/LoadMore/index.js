import React from 'react'
import Button from './../Forms/Button'

const LoadMore = ({
    onLoadMoreEvt = ()=>{

    },
}) => {
    return (
       <Button onClick={()=>onLoadMoreEvt()}>
           Xem thêm
       </Button>
    )
}

export default LoadMore
