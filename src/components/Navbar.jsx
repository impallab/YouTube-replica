import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { FaYoutube } from "react-icons/fa";
import { GiVideoCamera } from "react-icons/gi";
import { HiSwitchHorizontal } from "react-icons/hi";
import { MdNotificationsActive, MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setHomeVideos, setSearchSuggesion, toggleSidebar } from '../utils/appSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { searchSuggestion } = useSelector((store) => store.app);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const searchVideos = () => {
        dispatch(setHomeVideos([])); // Clear previous videos data
        fetchVideosByCategory(input); // Fetch videos based on the input text
    }

    const toggle = () => {
        dispatch(toggleSidebar());
    }

    const giveSuggestion = async () => {
        try {
          const res = await axios.get(`/suggestion/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=${input}`);
          console.log(res.data); // Log the raw response data
      
          // Use a regular expression to extract the suggestions
          const suggestionRegex = /\["(.*?)"/g;
          const suggestionArray = res.data.match(suggestionRegex).slice(1).map((str) => str.slice(1, -1));
      
          console.log(suggestionArray);
          dispatch(setSearchSuggesion(suggestionArray));
        } catch (error) {
          console.log(error);
        }
      }
      
    const acceptSuggestion = async (suggestion) => {
        setInput(suggestion);
        setShowSuggestion(false); // Hide suggestion chart

        await fetchVideosByCategory(suggestion); // Fetch videos based on the suggestion text
    }

    const fetchVideosByCategory = async (query) => {
        try {
            const categoriesVideoData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_BY_KEYWORD}${query}&type=video&key=${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            dispatch(setHomeVideos(categoriesVideoData.data.items)); // Dispatch the setHomeVideos action with the fetched videos data
        } catch (error) {
            console.log(error);
        }
    }

    // function to show/hide input box and suggestions
    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
        if (showSearchBar) {
            giveSuggestion();
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            giveSuggestion();
        }, 600);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <div className="fixed top-0 mb-0 w-full h-[60px] z-10 flex bg-black px-[2vh] justify-between">
            <div className='flex items-center lg:text-4xl sm:text-2xl xs:text-xl'>
                <HiSwitchHorizontal onClick={toggle} className='text-2xl xs:text-4xl cursor-pointer' />
                <div className='flex items-center'>
                    <FaYoutube className='text-red-600 text-2xl xs:text-4xl ml-[5vw] cursor-pointer' />
                    <p className='hidden mds:block lg:text-3xl font-semibold md:text-2xl'>MiniTube</p>
                </div>
            </div>

            {/* Show search bar and suggestions  */}
            <div className=" items-center p-3 relative w-[50vw] hidden sm:flex">
                <input
                    type="text"
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value);
                        setShowSuggestion(true);
                    }}
                    placeholder="search"
                    className="bg-black/5 border border-white/20 rounded-l-full outline-none px-0.5 sm:px-5 h-10 w-full"
                />
                <button
                    onClick={searchVideos}
                    className=" text-white sm:bg-white/25 h-10 sm:px-6 md:px-6 border border-white/25 rounded-r-full mr-4"
                >
                    <MdOutlineSearch />
                </button>

                {/* suggestion chart */}
                {showSuggestion && searchSuggestion.length !== 0 && (
                    <div className=" bg-[#2e2c2c] absolute top-full left-5 border border-white/45 p-2 rounded-lg -mt-2 w-[80%]">
                        <ul>
                            {searchSuggestion.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => acceptSuggestion(suggestion)}
                                    className="flex items-center gap-1 px-4 hover:bg-white/10  rounded-lg cursor-pointer"
                                >
                                    <MdOutlineSearch />
                                    <li className="px-2 py-1 font-medium">{suggestion}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Show search icon on extra-small screens */}
            {!showSearchBar && (
                <div onClick={toggleSearchBar} className="w-full p-2 ml-3 text-white mt-4 block xs:block sm:hidden">
                    <MdOutlineSearch />
                </div>
            )}

            {/* Show search bar and suggestions on extra-small screens when toggled */}
            {showSearchBar && (
                <div className="flex items-center p-6 relative min-w-56 sm:hidden">
                    <input
                        type="text"
                        value={input}
                        onChange={(event) => {
                            setInput(event.target.value);
                            setShowSuggestion(true);
                        }}
                        placeholder="search"
                        className="bg-black/5 border border-white/20 rounded-l-full outline-none p-1 px-3 h-[6vw] w-full"
                    />
                    <button
                        onClick={searchVideos}
                        className="text-white bg-red-600 h-[6vw] px-[3vw] border border-white/25 rounded-r-full mr-4"
                    >
                        <MdOutlineSearch />
                    </button>
                    {/* suggestion chart */}
                    {showSuggestion && searchSuggestion.length !== 0 && (
                        <div className="bg-[#2e2c2c] absolute top-full left-[-60px] xs:left-[-80px] mds:left-6  border border-white/45 p-2 w-[90vw] mds:w-[40vw] rounded-lg -mt-2">
                            <ul>
                                {searchSuggestion.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => acceptSuggestion(suggestion)}
                                        className="flex items-center gap-1 px-4 hover:bg-white/10 rounded-lg cursor-pointer"
                                    >
                                        <MdOutlineSearch className='text-2xl' />
                                        <li className="px-2 py-1 font-medium">{suggestion}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className='flex items-center m-3 sm:space-x-6 text-2xl cursor-pointer lg:text-3xl'>
                <GiVideoCamera className='hidden sm:block' />
                <div className='relative flex  items-center '>
                    <MdNotificationsActive className='hidden sm:block' />
                    <span className='hidden text-xs absolute  translate-x-1/2 -translate-y-1/2 bg-red-700 text-white rounded-full w-6 h-6 sm:flex font-semibold items-center justify-center  '>9+</span>
                </div>
                <Avatar src='https://scontent.fccu2-3.fna.fbcdn.net/v/t39.30808-6/431009268_1819586721819559_8166665112089281255_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cWH_0O7TysYAX-R77LY&_nc_ht=scontent.fccu2-3.fna&oh=00_AfDKcIsg6adqA4T9KBAZwXbVwO2mrkJjBHl9MTtUeCrF-A&oe=66038B6F' size={39} className='rounded-full' />
            </div>
        </div>
    );
}