import React from 'react'
import {useSelector} from 'react-redux'
import UserProfile from '../UserProfile'

const VerticalNav = ({children}) => {
    const currentUser= useSelector(state=>state.user.currentUser);
    

    const configUserProfile={
        currentUser
    }

    return (
        <div  className="verticalNav">
            <UserProfile {...configUserProfile}/>

            <div className="menu">
                {children }
            </div>
            
        </div>
    )
}

export default VerticalNav
