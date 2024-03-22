import React, { useEffect, useState } from 'react';
import VideoCart from './VideoCart';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Videos = () => {
    const [allVideos, setAllVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const videosData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_API_URL}${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            // console.log(videosData?.data?.items);
            setAllVideos(videosData?.data?.items || []);
        } catch (error) {
            console.log("Failed to fetch data : ", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className={`w-full grid grid-cols-3 gap-6 `}>
            {
                allVideos.map((video) => {
                    // console.log(video.id)
                    return (
                        <Link className={`flex `} to={`/watch?v=${video.id}`} key={video.id}>
                            <VideoCart props={video} />
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Videos;