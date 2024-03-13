import React from "react";
import { Navigate } from "react-router-dom";

function Protected(props){
    const Cmd = props.cmd;
    var auth = sessionStorage.getItem('Auth');
    return(
        <div>{auth ? <Cmd/>:<Navigate to='/login'></Navigate>}

        </div>
    )
}
export default Protected;