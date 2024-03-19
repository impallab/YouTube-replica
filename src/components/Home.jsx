import React from 'react'
import Buttons from './Buttons.jsx';
import Feed from './Feed'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';


function Home() {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <>
            <div className={`flex ${isOpen ? "px-60" : "px-32"}`}>
                <Buttons />
            </div>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Home