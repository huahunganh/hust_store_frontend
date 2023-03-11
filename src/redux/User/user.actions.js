import userTypes from './user.types';
import {auth, handleUserProfile, GoogleProvider} from '../../firebase/ultils';


export const setCurrentUser = (user) => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({email, password}) => async dispatch => {
    try {

        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });

    } catch (error) {
        // console.log(error);
        dispatch({
            type: userTypes.SIGN_IN_ERROR,
            payload: error.message

        });

    }
};

export const resetAllForms = () => ({
    type: userTypes.RESET_AUTH_USER
});

export const signOut = () => async dispatch => {
    try {
        await auth.signOut().then(
            () => {
                dispatch({
                    type: userTypes.SET_CURRENT_USER,
                    payload: null
                });

                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: false
                });
            }
        );


    } catch (error) {
        console.log(error);
    }

};

export const signUpUser = ({displayName, email, password, confirmPassword}) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ['Password dont match!'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return;
    }
    try {


        const {user} = await auth.createUserWithEmailAndPassword(email, password);

        await handleUserProfile(user, {displayName});
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })


    } catch (error) {
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: error.message
        });


    }

};

export const resetPassword = ({email}) => async dispatch => {

    try {
        const config = {
            url: 'http://localhost:3000/login'
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                });


            })
            .catch((er) => {
                const err = ['Email not Found!'] + [er.message];
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                });
            })

    } catch (error) {

        dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: error.message
        });
    }
};

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: true
                })
            });


    } catch (error) {
        console.log(error);
    }
};