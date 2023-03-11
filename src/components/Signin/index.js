import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {signInUser, signInWithGoogle} from '../../redux/User/user.actions';
import AuthWraper from '../AuthWraper';
import Button from '../Forms/Button';
import FormInput from './../Forms/Forminput';
import './style.scss';


const Signin = () => {
    const signInsuccess = useSelector(state => state.user.singnInSuccess);
    const signInError = useSelector(state => state.user.signInError);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (signInsuccess) {
            history.push('/');
            resetForm();

        }


    }, [signInsuccess])

useEffect(()=>{

    if(Array.isArray(signInError) && signInError.length >0){
        setErr(signInError);
    }


},[signInError])
const handleGoogleSignIn =()=>{
    dispatch(signInWithGoogle());
}

const resetForm = ()=>{
    setPassword('');
    setEmail('');
}
 

const handleSubmit =  e =>{
    e.preventDefault();
    dispatch(signInUser({email,password}));
  
    

    

}
const configAuthWrapper={
    headline : 'Đăng nhập'
};
    return (
        <AuthWraper {...configAuthWrapper}>
                {err?err:''}
               <div className="formWrap">
                   <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="email"
                       handleChange={e=> setEmail(e.target.value)}
            
                    
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e=> setPassword(e.target.value)}
                    
                    />
                    <Button type="submit">
                        Đăng nhập
                    </Button>
                    </form>


                        <div className="socialSignin">
                            <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                               Đăng nhập với Google
                            </Button>
                            </div>
                        </div>
                        <div className="links">
                            <Link to="/recovery">
                                Quên mật khẩu
                            </Link>
                        </div>

                   
               </div>
        </AuthWraper>
    )
}

export default Signin
