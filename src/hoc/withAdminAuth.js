import UseAdminAuth from "../CustomHooks/useAdminAuth";

const WithAdminAuth = props => UseAdminAuth(props) && props.children;

export default WithAdminAuth