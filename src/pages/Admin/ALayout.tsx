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
                <div className='SideB'>
                    <SideMenu/>
                </div>
                <div className='AdminBody'>  
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default ALayout;