import React from 'react'
import { useSelector } from 'react-redux';
import { Videos, Buttons } from "../components"
const Feed = () => {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <>
            <div className='overflow-x-hidden'>
                <div className={`${isOpen ? "md:ml-16 " : "md:ml-16 "}flex overflow-x-scroll whitespace-nowrap buttons selection:false `}>
                    <Buttons />
                </div>
            </div>
            <div className={`videos relative overflow-y-auto mr-2 mt-10 ${isOpen ? "ml-2 md:ml-20 " : "ml-2 md:ml-20 "}`}>
                <Videos />
            </div>
        </>
    )
}

export default Feed