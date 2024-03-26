import React from 'react'
import { useSelector } from 'react-redux';
import { Videos, Buttons } from "../components"
const Feed = () => {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <>
            <div className='overflow-x-hidden'>
                <div className={`flex overflow-x-scroll whitespace-nowrap buttons selection:false ${isOpen ? "px-60" : "px-4 sm:px-20"}`}>
                    <Buttons />
                </div>
            </div>
            <div className={`relative overflow-y-auto mr-4 mt-10 ${isOpen ? "ml-4 sm:ml-60 md:ml-64" : "ml-4 sm:ml-28 "}`}>
                <Videos />
            </div>
        </>
    )
}

export default Feed