import React from 'react';
import { Link } from 'react-router-dom';
import { accountService } from '../_service/service.tsx';
import { useNavigate } from 'react-router-dom';
import './admincomponents.css'

const SideMenu = () => {
    let navigate = useNavigate()
    const logout = () => { 
        accountService.logout()
        navigate('/auth/login')
    }
    return (
        <div className='SideMenu'>
            <ul>
                <li> <Link to="/admin/dashboard"> Dashboard </Link> </li>
                <li> <Link to="/admin/customers"> Customers </Link> </li>
                <li> <Link to="/admin/invoices"> Invoices </Link> </li>
                <li> <Link to="/admin/payments"> Paiement receipt  </Link> </li>
                <button onClick={logout}> Deconnexion </button> 
            </ul>
        </div>
    );
};

export default SideMenu;