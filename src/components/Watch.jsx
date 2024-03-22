import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { SlLike, SlDislike } from "react-icons/sl";
import { FaShare } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import formatCount from '../utils/formatCounter';

function Watch() {
    const isOpen = useSelector((store) => store.app.isOpen);
    //extract the clicked video id :
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    //details of the clicked video id using its id:
    const [watchVideo, setWatchVideo] = useState(null)
    const playingVideoDetails = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_YOUTUBE_PLAYING_VIDEO_BY_ID}${videoId}&key=${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            console.log(res?.data?.items[0])
            setWatchVideo(res?.data?.items[0]);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        playingVideoDetails()
    }, [])
    // console.log("video Details : "+watchVideo);
    return (
        <div className={`mt-20 ${isOpen ? "ml-56" : "ml-24"}`}>
            <div className='inline-block  '>
                <div className='animated-border rounded-lg'>
                    <iframe
                        width="910"
                        height="490"
                        style={{ borderRadius: '15px' }}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        framebkorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    >
                    </iframe >
                </div>
                <h3 className='text-white p-2'>{watchVideo?.snippet?.title || "Video Title"}</h3>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div >
                            <Avatar size='40' className='mx-1 mr-4 rounded-full' src={watchVideo?.snippet?.thumbnails?.maxres.url || watchVideo?.snippet?.thumbnails?.standard.url || watchVideo?.snippet?.thumbnails?.high.url || watchVideo?.snippet?.thumbnails?.defaul.url || ""} />
                        </div>
                        <div className="flex ">
                            <div>
                                <h3>{watchVideo?.snippet?.channelTitle || "Title"}</h3>
                                <h3>{watchVideo?.statistics.viewCount} views</h3>
                            </div>

                            <button className='ml-5 bg-white/20 px-7 rounded-full'>Subscribe
                                {/* <label htmlFor="subscription-options">
                                    <select name="subscription" id="subscription-options" className='text-black'>
                                        <option value=""></option>
                                        <option value="">All</option>
                                        <option value="">Personalized</option>
                                        <option value="">None</option>
                                        <option value="">iSsubcribed</option>
                                    </select>
                                </label> */}
                            </button>

                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='bg-white/15 rounded-full p-2'>
                            <button className='inline mr-3 ml-2 border-white/25 border-r-[0.5px] pr-3'><SlLike /> {formatCount(watchVideo?.statistics.likeCount)}</button>
                            <button className='mr-2'><SlDislike /></button>
                        </div>
                        <button className='mr-10 ml-7 bg-white/25 p-2 px-3 rounded-full'><FaShare /></button>
                        <button className='mr-10 bg-white/25 p-2 px-3 rounded-full'><IoMdDownload /></button>
                        <div className='mr-10 bg-white/25 p-2 px-3 rounded-full'>
                            <button><IoIosMore /></button>
                            {/* <label htmlFor="more">
                                <select name="" id="more">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                </select>
                            </label> */}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Watch