import React from 'react'
import { useHistory } from 'react-router';
import userIMG from './../../asset/programmer.png'
import './style.scss'
const UserProfile = ({...props}) => {
    const {currentUser} =props;
    
    const history = useHistory();
    if(!currentUser){
      
        history.push('/login');
        return null;
       
    }
    const {displayName} = currentUser;
     return (
        <div className="userProfile">
        <ul>
          <li>
            <div className="img">
              <img src={userIMG} />
            </div>
          </li>
          <li>
            <span className="displayName">
              {displayName}
            </span>
          </li>
        </ul>
      </div>
    )
}

export default UserProfile
