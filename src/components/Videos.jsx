import React, { useEffect, useState } from 'react';
import axios from "axios";
import VideoCart from './VideoCart';
import { NavLink } from 'react-router-dom';
const Videos = () => {
    const [allVideos, setAllVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const videosData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_API_URL}+${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            // console.log(videosData?.data?.items);
            setAllVideos(videosData?.data?.items || []);
        } catch (error) {
            console.log("Failed to fetch data : ", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [import.meta.env.VITE_YOUTUBE_VIDEO_API_URL, import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY]);

    return (
        <div className={`w-full grid grid-cols-4 gap-6 `}>
            {
                allVideos.map((video) => {
                    return (
                        <NavLink className={`flex`} to="/watch" key={video.id}>
                            <VideoCart props={video} />
                        </NavLink>
                    )
                })
            }
        </div>
    );
};

export default Videos;