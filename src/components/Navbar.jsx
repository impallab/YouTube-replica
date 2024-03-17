import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { FaMicrophoneAlt, FaYoutube } from "react-icons/fa";
import { GiVideoCamera } from "react-icons/gi";
import { HiSwitchHorizontal } from "react-icons/hi";
import { ImYoutube2 } from "react-icons/im";
import { MdNotificationsActive, MdOutlineSearch } from "react-icons/md";
import { toggleSidebar } from '../utils/appSlice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const dispatch = useDispatch();


    const toggle = () => {
        dispatch(toggleSidebar())
    }

    return (
        <div className="fixed w-[100%] z-10">
            <div className="flex bg-black px-5 justify-between">
                <div className='flex text-3xl items-center'>
                    <HiSwitchHorizontal onClick={toggle} />
                    <FaYoutube className='text-red-600 ml-8 mr-1' />
                    <ImYoutube2 className='text-6xl text-white ml-4' />
                </div>
                <div className='flex items-center p-3 '>
                    <input type="text" placeholder='search' className='bg-black/5 border border-white/20 rounded-l-full outline-none p-1 px-5 h-10 w-[29rem]' />
                    <button className=' text-white bg-white/25 h-10 px-6 border border-white/25 rounded-r-full mr-4'>
                        <MdOutlineSearch />
                    </button>
                    <span className=' bg-white/25 border border-white/35 rounded-full p-2.5'>
                        <FaMicrophoneAlt />
                    </span>
                </div>
                <div className='flex items-center m-3 space-x-8 text-2xl'>
                    <GiVideoCamera />
                    <MdNotificationsActive />
                    <Avatar src='https://scontent.fccu2-3.fna.fbcdn.net/v/t39.30808-6/431009268_1819586721819559_8166665112089281255_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dwa9jr6zd6MAX9vidLj&_nc_ht=scontent.fccu2-3.fna&oh=00_AfCgty3rnBawvUcJMljdNpHpBxv5at0FPkzySeCL42D9UQ&oe=65F9A82F' size="30" className='rounded-full' />
                </div>
            </div>
        </div>
    )
}
