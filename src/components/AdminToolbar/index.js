import React from 'react'
import {useSelector} from 'react-redux'
import {IconButton, Typography} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";
import './style.scss'
import {checkUserIsAdmin} from './../../Utils'
import {Link} from "react-router-dom";

const AdminToolbar = ({onClick}) => {
    const currentUser = useSelector(state=>state.user.currentUser);
    const isAdmin = checkUserIsAdmin(currentUser);

    if(!isAdmin) return null;
    return (
        <div className="adminToolbar">
            <ul>
                <li>
                    <IconButton className='sideMenuIcon' anchor='left' onClick={onClick}>
                        <MenuIcon fontSize='large'/>
                    </IconButton>
                </li>

                <li>
                    <Link to='/admin'>
                        <Typography className='adminHeaderTitle'>Hung Anh STORE Management Site</Typography>
                    </Link>
                </li>

                <li>
                    <Typography style={{fontSize:'20px', paddingTop:'7px'}} anchor='right'> Xin chào {currentUser.displayName}</Typography>
                </li>
            </ul>
            
        </div>
    )
}

export default AdminToolbar
