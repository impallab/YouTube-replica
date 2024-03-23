import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
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
            name: "pallab",
            messages: message
        }));
        setMessage(""); //function for set the value from input. 
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevValue) => prevValue + emojiObject.emoji);
        setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
    };

    const handleLikeClick = () => {
        setLikeClicked(true);
        setDislikeClicked(false);
    };

    const handleDislikeClick = () => {
        setDislikeClicked(true);
        setLikeClicked(false);
    };


    return (
        <div className='flex w-[100%]'>
            <div className='video w-[75%]'>
                <div className={`mt-20 ${isOpen ? "ml-56" : "ml-32"}`}>
                    <div className='inline-block  '>
                        <div className='animated-border rounded-lg'>
                            <iframe
                                width="870"
                                height="490"
                                style={{ borderRadius: '15px' }}
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                framebkorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        <h3 className='text-white font-extrabold  p-2'>{watchVideo?.snippet?.title || "Video Title"}</h3>
                        <div className='flex justify-between'>

                            <div className='flex items-center' >
                                <div>
                                    <Avatar size='40' className='mx-1 mr-4 mt-1 rounded-full ' src={watchVideo?.snippet?.thumbnails?.maxres.url || watchVideo?.snippet?.thumbnails?.standard.url || watchVideo?.snippet?.thumbnails?.high.url || watchVideo?.snippet?.thumbnails?.defaul.url || ""} />
                                </div>

                                <div>
                                    <h3 className='text-blue-800 font-bold'>{watchVideo?.snippet?.channelTitle || "Title"}</h3>
                                    <h3 className='text-white/55'>{formatCount(watchVideo?.statistics.viewCount || "0")} views</h3>
                                </div>

                                <div className=" ml-5 bg-white text-black p-2 font-semibold  px-5 rounded-full ">
                                    Subscribe
                                </div>

                            </div>

                            <div className='flex items-center'>
                                <div className='flex bg-white/15 rounded-full p-2'>
                                    <button className={`flex font-semibold mr-3 ml-2 items-center gap-3 border-white/25 border-r-[0.5px] pr-3 ${likeClicked ? 'text-blue-500' : ''}`} onClick={handleLikeClick}>
                                        <BiSolidLike size="24px" />
                                        {formatCount(watchVideo?.statistics.likeCount || "0")}
                                    </button>
                                    <button className={`mr-2 ${dislikeClicked ? 'text-blue-500' : ''}`} onClick={handleDislikeClick}>
                                        <BiSolidDislike size="24px" />
                                    </button>
                                </div>
                                <button className='flex font-semibold items-center gap-2 mr-2 ml-2 bg-white/25 p-2 px-3 rounded-full'><FaShare />Share</button>
                                <button className='flex font-semibold items-center gap-2 mr-2 bg-white/25 p-2 px-3 rounded-full'><IoMdDownload />Download</button>
                                <div className='mr-2 bg-white/25 p-2 px-3 rounded-full'>
                                    <button><IoIosMore /></button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`text-center font-semibold cursor-pointer mr-4 w-[28%] h-fit border border-white/25 p-2 mt-20 rounded-2xl ${isOpen ? "ml-2 mr-6" : " mr-8 "}`}>
                {!showChat && (
                    <div onClick={handleChatToggle}>
                        <h3>Show chat</h3>
                    </div>
                )}

                {showChat && (
                    <div className=' '>
                        <div className='flex justify-between font-semibold mx-2'>
                            <h4 className='m-3'>Top Chat</h4>
                            <div className='items-center'>
                                <button className={`mx-2 mb-2 px-1.5 rounded-full hover:bg-white/20 rotate-90  `}>
                                    . . .
                                </button>
                                <button className={`px-3 mt-2  text-2xl rounded-full hover:bg-white/20`} onClick={handleCloseChat}>
                                    <FaEyeSlash />
                                </button>
                            </div>
                        </div>
                        <div className='livechat overflow-y-auto h-[63vh] border-y bg-black/5 border-white/20 p-2 flex flex-col-reverse'>
                            <LiveChat />
                        </div>
                        <div className='justify-between flex pt-2 relative' >
                            <div className='bg-white/10 pt-2 mr-4 w-[85%] border border-white/25 rounded-full'>
                                <input
                                    type="text"
                                    name="chat"
                                    id="liveChat"
                                    className='bg-transparent mb-2 w-52 outline-none'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    ref={inputRef}
                                />
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
                            </div>
                            <button className='bg-white/25 m-2 p-1.5 rounded-full'>
                                <GrSend onClick={sendMessage} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watch;