import React from 'react'
import Button from './../Forms/Button'

const LoadMore = ({
    onLoadMoreEvt = ()=>{

    },
}) => {
    return (
       <Button style={{maxHeight:'40px'}} onClick={()=>onLoadMoreEvt()}>
           Xem thêm
       </Button>
    )
}

export default LoadMore
