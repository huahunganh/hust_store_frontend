import React from 'react'

import './style.scss';

const AuthWraper = ({headline,children }) => {
    return (
        <div className="authWraper">
            <div className="wrap">
              {headline?<h2>{headline}</h2>:''}
              
               <div className="children">
                 {children&&children}
               </div>
            </div>
        </div>
    )
}

export default AuthWraper
