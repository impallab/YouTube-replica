import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaShare, FaEyeSlash } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import formatCount from '../utils/formatCounter';
import { MdEmojiEmotions } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import EmojiPicker from 'emoji-picker-react';
import { usePopper } from 'react-popper';
import LiveChat from './LiveChat';
import { setMessages } from '../utils/liveChatSlice';
import { Buttons, Feed } from '.';

function Watch() {
    const isOpen = useSelector((store) => store.app.isOpen);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const [watchVideo, setWatchVideo] = useState(null);
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');
    const inputRef = useRef(null); // Reference to the input field
    const dispatch = useDispatch()


    // Popper configuration
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top-start', // Position the popper above and aligned to the left of the input field
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [-10, 10], // Offset the popper slightly to the left and top
                },
            },
        ],
    });

    const playingVideoDetails = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_YOUTUBE_PLAYING_VIDEO_BY_ID}${videoId}&key=${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            setWatchVideo(res?.data?.items[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        playingVideoDetails();
        setReferenceElement(inputRef.current); // Set the reference element for the popper
    }, []);

    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const sendMessage = (event) => {
        setMessage(event.target.value);
        dispatch(setMessages({ // reducer created in the liveChatSlice.
            name: "Pallab",
            messages: message
        }));
        setMessage(""); //function for set the value from input. 
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevValue) => prevValue + emojiObject.emoji);
        // setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
    };

    const handleLikeClick = () => {
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);
    };

    const handleDislikeClick = () => {
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);
    };


    return (

        <div className='min-h-screen mt-[60px] md:mt-[75px] md:ml-[5px] flex flex-col md:flex-row w-full justify-between overflow-x-hidden'>

            <div className='  relative  w-full md:w-[68%] lg:w-[56%] xl:w-[64%] 2xl:w-[68%]'>
                <div className='relative  inline-block w-full h-[57vw] md:h-[54vh] lg:h-[64vh] xl:h-[62vh] 2xl:h-[70vh] lg:ml-20'>
                    <div className='animated-border rounded-2xl w-full h-full '>
                        <iframe
                            className="w-full h-full rounded-2xl bg-cover"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* implement the css for different screen size : */}

                    <div className="relative p-6 mds:p-2 w-full">
                        <h3 className='text-white font-extrabold text-xs mds:text-xl'>{watchVideo?.snippet?.title || "Video Title"}</h3>
                        <div className='flex flex-col xl:flex-row justify-between'>
                            <div className=' xs:flex items-center'>
                                <div className='flex'>
                                    <NavLink>
                                        <Avatar
                                            size='40'
                                            className='mx-1 mr-4 mt-1 rounded-full cursor-pointer'
                                            src={
                                                watchVideo?.snippet?.thumbnails?.maxres.url ||
                                                watchVideo?.snippet?.thumbnails?.standard.url ||
                                                watchVideo?.snippet?.thumbnails?.high.url ||
                                                watchVideo?.snippet?.thumbnails?.defaul.url ||
                                                ""
                                            }
                                        />
                                    </NavLink>
                                    <div>
                                        <h3 className='text-blue-800 font-bold cursor-pointer'>{watchVideo?.snippet?.channelTitle || "Title"}</h3>
                                        <h3 className='text-white/55'>{formatCount(watchVideo?.statistics.viewCount || "0")} views</h3>
                                    </div>
                                </div>
                                <div className="text-center m-2 mds:ml-5 bg-white text-black p-2 font-semibold xs:px-5 rounded-full cursor-pointer">
                                    Subscribe
                                </div>
                            </div>
                            <div className=' flex items-center my-4 sm:m-1 md:mt-0 w-full md:w-auto justify-center'>
                                <div className='flex items-center bg-white/15 rounded-full p-2 '>
                                    <button
                                        className={`flex font-semibold xs:mr-3 xs:ml-2 text-center xs:gap-3 border-white/25 border-r-[0.5px] mds:pr-3 ${likeClicked ? 'text-blue-500' : ''
                                            }`}
                                        onClick={handleLikeClick}
                                    >
                                        <BiSolidLike size="24px" />
                                        <span className='hidden xs:block'>{formatCount(watchVideo?.statistics.likeCount || "0")}</span>
                                    </button>
                                    <button
                                        className={`xs:mr-2 ${dislikeClicked ? 'text-blue-500' : ''}`}
                                        onClick={handleDislikeClick}
                                    >
                                        <BiSolidDislike size="24px" />
                                    </button>
                                </div>
                                <div className='flex gap-2'>
                                    <button className='flex font-semibold items-center gap-2 mr-2 ml-2 bg-white/25 p-2 mds:px-3 rounded-full'>
                                        <FaShare />
                                        <span className='hidden mds:block'>Share</span>
                                    </button>
                                    <button className='flex font-semibold items-center gap-2  bg-white/25 p-2 px-3 rounded-full'>
                                        <IoMdDownload />
                                        <span className='hidden mds:block'> Download</span>
                                    </button>
                                    <div className=' bg-white/25 p-2 px-3 rounded-full'>
                                        <button>
                                            <IoIosMore />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' mt-20 mb-5 md:mt-0 rounded-lg realtive mx-2 w-[98vw] md:w-[28%] lg:w-[34%] xl:w-[28%] 2xl:w-[25%] '>

                <div className={`overflow-x-hidden text-center font-semibold cursor-pointer w-full h-fit border border-white/25 p-2   rounded-2xl `}>
                    {!showChat && (
                        <div onClick={handleChatToggle}>
                            <h3>Show chat</h3>
                        </div>
                    )}

                    {showChat && (
                        <div className=''>
                            <div className='flex justify-between font-semibold mx-2'>
                                <h4 className='m-1'>Top Chat</h4>
                                <div className='items-center'>
                                    <button className={`mx-2 mb-2 px-1.5 rounded-full hover:bg-white/20 rotate-90  `}>
                                        . . .
                                    </button>
                                    <button className={`px-3 mt-2  text-2xl rounded-full hover:bg-white/20`} onClick={handleCloseChat}>
                                        <FaEyeSlash />
                                    </button>
                                </div>
                            </div>
                            <div className='livechat overflow-x-hidden overflow-y-auto h-[63vh] border-y bg-black/5 border-white/20 p-2 flex flex-col-reverse'>
                                <LiveChat />
                            </div>
                            <div className='w-[90%] justify-between md:mr-2 items-center flex pt-2 relative' >
                                <div className=' bg-white/10 pt-2 mr-1 w-[65%] flex border border-white/25 rounded-full md:rounded-2xl lg:rounded-full'>
                                    <input
                                        type="text"
                                        name="chat"
                                        id="liveChat"
                                        className='bg-transparent mb-2 w-52 outline-none'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        ref={inputRef}
                                    />
                                </div>
                                <div className='flex w-[35%]'>
                                    <button className='ml-6' onClick={toggleEmojiPicker}>
                                        <MdEmojiEmotions size="22px" />
                                    </button>
                                    <div
                                        ref={setPopperElement}
                                        style={{
                                            ...styles.popper,
                                            zIndex: 9999, // Ensure the popper is rendered on top of other elements
                                        }}
                                        {...attributes.popper}
                                    >
                                        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                                    </div>

                                    <button className='bg-white/25 m-2  p-1.5 rounded-full'>
                                        <GrSend onClick={sendMessage} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* css is  done for this part, fetching videos via these button in watch page have to implement :
                <div className=' relative mx-2'>
                    <div className={`mt-[3vh] p-2 overflow-x-scroll w-[100%]`}>
                        <Buttons />
                    </div>
                </div> */}
            </div>
        </div>


    );
}

export default Watch;