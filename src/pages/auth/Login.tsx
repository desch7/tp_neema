import React, { useState } from 'react';
import './auth.css'

import { accountService } from '../../_service/service.tsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        login : '',
        password: ''
    })
    
    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(credentials)
        if (credentials.login === 'magloire' && credentials.password === '1234'){
            accountService.saveToken('connecté')
            navigate('/admin')
        } else {
            console.log('echec de connexion')
        }
        /* accountService.login(credentials)
            .then(res => {
                console.log(res)
                accountService.saveToken(res.data.token)
                navigate('/admin', {replace: true})
            })
            .catch(error => console.log(error)) */
    }

    return (
        <div className='forms'>
            <div className='forms1'>
                <form onSubmit={onSubmit} >
                    <div className='group'>
                        <label htmlFor="login"> Login</label>
                        <input type="text" name="login" value={credentials.login} onChange={onChange}/>
                    </div>
                    <div className='group'>
                        <label htmlFor="login"> Mot de passe </label>
                        <input type="text" name="password" value={credentials.password} onChange={onChange}/>
                    </div>
                    <div className='group'>
                        <button>Connexion</button>
                    </div>
                </form>
            </div>
            <div className='forms2'></div>
        </div>
    );
};

export default Login;