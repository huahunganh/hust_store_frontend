import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


const mapState = ({user}) =>({
    currentUser: user.currentUser
});

const UseAuth = () => {
    const {currentUser} = useSelector(mapState);
    const history = useHistory();
    useEffect(() => {
        if (!currentUser) {
            history.push('/login');
        }

    }, [currentUser])

    return currentUser;
};

export default UseAuth;