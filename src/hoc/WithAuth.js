import UseAuth from '../CustomHooks/UseAuth';

const WithAuth = props => UseAuth(props) && props.children;

export default WithAuth;