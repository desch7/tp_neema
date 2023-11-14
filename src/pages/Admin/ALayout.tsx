import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header.tsx';
import SideMenu from '../../Components/SideMenu.tsx';

import './admin.css'


const ALayout = () => {
    return (
        <div className='ALayout'>
            <Header/>
            <div id="admin">
                <SideMenu/>
                <div id='admin_body'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default ALayout;