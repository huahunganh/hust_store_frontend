import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {resetAllForms, resetPassword} from '../../redux/User/user.actions';
import AuthWraper from '../AuthWraper';
import Button from '../Forms/Button';
import FormInput from '../Forms/Forminput';
import './style.scss';

const EmailPassword = ({ props }) => {
    
    const resetPasswordSuccess = useSelector(state=>state.user.resetPasswordSuccess);
    const resetPasswordError = useSelector(state => state.user.resetPasswordError);
    const dispatch= useDispatch();


    const configAuthWrapper = {
        headline: 'Quên mật khẩu'
    }
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');


    let history = useHistory();
    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllForms());
            setEmail('');
            history.push('/');
            setErr([]);
        }
        
    }, [resetPasswordSuccess])
    useEffect(() => {
        if(resetPasswordError){
            setErr(resetPasswordError);
        }
        
    }, [resetPasswordError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPassword({email}));

       

    }


    return (
        <AuthWraper {...configAuthWrapper}>
            <div className="formWrap">
                {err ? err : ''}
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Button type="submit">
                        Xác nhận
                </Button>

                </form>
            </div>

        </AuthWraper>
    )
}

export default EmailPassword
