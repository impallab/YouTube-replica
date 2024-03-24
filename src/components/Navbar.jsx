import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { FaMicrophoneAlt, FaYoutube } from "react-icons/fa";
import { GiVideoCamera } from "react-icons/gi";
import { HiSwitchHorizontal } from "react-icons/hi";
import { ImYoutube2 } from "react-icons/im";
import { MdNotificationsActive, MdOutlineSearch } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setCategoryVideos, toggleSidebar } from '../utils/appSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const searchVideos = () => {
        dispatch(setCategoryVideos(input));
        setInput("");
    }
    const toggle = () => {
        dispatch(toggleSidebar())
    }

    return (
        <div className="fixed top-0 mb- w-[100%] z-10 flex bg-black px-5 justify-between">

            <div className='flex text-3xl items-center'>
                <HiSwitchHorizontal onClick={toggle} className='cursor-pointer' />
                <FaYoutube className='text-red-600 ml-8 mr-1 cursor-pointer' />
                <ImYoutube2 className='text-6xl text-white ml-4 cursor-pointer' />
            </div>
            <div className='flex items-center p-3'>
                <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder='search' className='bg-black/5 border border-white/20 rounded-l-full outline-none p-1 px-5 h-10 w-[29rem]' />
                <button onClick={searchVideos} className=' text-white bg-white/25 h-10 px-6 border border-white/25 rounded-r-full mr-4'>
                    <MdOutlineSearch />
                </button>
                <span className=' bg-white/25 border border-white/35 rounded-full p-2.5 cursor-pointer'>
                    <FaMicrophoneAlt />
                </span>
            </div>
            <div className='flex items-center m-3 space-x-8 text-2xl cursor-pointer'>
                <GiVideoCamera />
                <MdNotificationsActive />
                <Avatar src='https://scontent.fccu2-3.fna.fbcdn.net/v/t39.30808-6/431009268_1819586721819559_8166665112089281255_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cWH_0O7TysYAX-R77LY&_nc_ht=scontent.fccu2-3.fna&oh=00_AfDKcIsg6adqA4T9KBAZwXbVwO2mrkJjBHl9MTtUeCrF-A&oe=66038B6F' size="30" className='rounded-full' />
            </div>

        </div>
    )
}
