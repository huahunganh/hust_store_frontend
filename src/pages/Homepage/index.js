import React, {useEffect} from 'react'
import Directory from '../../components/Directory'
import './style.scss';
import {checkUserIsAdmin} from "../../Utils";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

export const Homepage = () => {

    const  currentUser =  useSelector(state=>state.user.currentUser);
    const  history =  useHistory();


    useEffect(() => {
        if (checkUserIsAdmin(currentUser)) {
            history.push('/admin')
        }
    }, [currentUser]);

    return (
        <section className="homepage">
           <Directory/>
            
        </section>
    )
}
export default Homepage;
