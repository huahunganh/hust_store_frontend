import React from 'react'
import { useHistory } from 'react-router-dom';
import shopmen from './../../asset/shopmen.jpg';
import shopwomen from './../../asset/shopwomen.jpg';
import './style.scss';
export const Directory = () => {
    const history= useHistory();
    return (
        <div className="directory">
            <div 
            className='item'
            style={{
                backgroundImage: `url(${shopwomen})`
            }}>
                <a onClick={()=>history.push(`/search/womens`)}>Đồ Nữ</a>
            </div>

            <div 
            className='item'
            style={{
                backgroundImage: `url(${shopmen})`
            }}>
                <a onClick={()=>history.push(`/search/mens`)}>Đồ Nam</a>
            </div>
          
        </div>
    )
}

export default Directory;