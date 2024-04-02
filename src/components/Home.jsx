import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


function Home() {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Home