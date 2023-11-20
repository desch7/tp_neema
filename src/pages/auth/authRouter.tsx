import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import Error from '../../_Utils/Error.tsx';

const AuthRouter = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </div>
    );
};

export default AuthRouter;