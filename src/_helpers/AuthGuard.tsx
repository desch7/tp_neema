import { Navigate } from "react-router-dom";
import { accountService } from "../_service/service.tsx";
import React from "react";


const AuthGuard = ({ children }: { children: JSX.Element }) => {

    if(!accountService.isLogged()){
        return <Navigate to="/auth/login" />
    }
    
    return children;
};

export default AuthGuard;