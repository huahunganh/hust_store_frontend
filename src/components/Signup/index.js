import {React, useEffect, useState} from 'react'
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';
import AuthWraper from '../AuthWraper';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../redux/User/user.actions';


const Signup = ({props}) => {
    
    const signUpSucces = useSelector(state => state.user.signUpSucces);
    const signUpError = useSelector(state => state.user.signUpError);
    const dispatch= useDispatch();

const initialState='';
const [displayName, setDisplayName] = useState(initialState);
const [email, setEmail] = useState(initialState);
const [password, setPassword] = useState(initialState);
const [confirmPassword, setConfirmPassword] = useState(initialState);

useEffect(()=>{
    if(signUpSucces){
    resetForm();
    props.history.push('/');
    
    }


},[signUpSucces])

useEffect(()=>{
    if( signUpError.length >0){
        setErr(signUpError);
    }

},[signUpError])

const resetForm = ()=>{
    setPassword('');
    setEmail('');
    setConfirmPassword("");
    setDisplayName('');
}
const [err,setErr] =useState([]);
const handleSubmit =  event =>{
    event.preventDefault();
    dispatch(signUpUser({displayName,email,password,confirmPassword}));
    


    

}
const configAuthWrapper={
    headline: 'Đăng kí'
}


    return (
       <AuthWraper {...configAuthWrapper}>
                {err? err :''}
                <div className="formWrap">

                
                <form onSubmit={handleSubmit}>
                    
                    <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="Họ tên"
                    handleChange={e=>setDisplayName(e.target.value)}
                    />
                    <FormInput
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e=>setEmail(e.target.value)}
                    />

                    <FormInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    handleChange={e=>setPassword(e.target.value)}
                    />

                    <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    handleChange={e=>setConfirmPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Đăng kí
                    </Button>
                </form>
                </div>
        </AuthWraper>
    )
}

export default withRouter(Signup)