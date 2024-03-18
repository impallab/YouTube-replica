import React, { useEffect } from 'react';
import axios from "axios";

const Videos = () => {
    const fetchVideos = async () => {
        try {
            const videosData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_API_URL}+${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            console.log(videosData.data);
        } catch (error) {
            console.log("Failed to fetch data : ", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return <div></div>;
};

export default Videos;