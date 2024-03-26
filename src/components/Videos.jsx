import React, { useEffect, useState } from 'react';
import VideoCart from './VideoCart';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideos } from '../utils/appSlice';

const Videos = () => {
    const { allVideos, category } = useSelector((store) => store.app);
    const dispatch = useDispatch()

    const fetchVideos = async () => {
        try {
            const videosData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_API_URL}${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            dispatch(setHomeVideos(videosData?.data?.items || []));
            // console.log(videosData.data)
        } catch (error) {
            console.log("Failed to fetch data : ", error);
        }
    };

    const fetchVideosByCategory = async () => {
        try {
            const categoriesVideoData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_BY_KEYWORD}${category}&type=video&key=${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            // console.log(categoriesVideoData.data)
            dispatch(setHomeVideos(categoriesVideoData.data.items));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (category == "All") {
            fetchVideos();
        } else {
            fetchVideosByCategory();
        }
    }, [category]);

    return (
        <div className="w-full gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {allVideos.map((video) => (
                <Link
                    className="flex"
                    to={`/watch?v=${video?.id?.videoId || video?.id}`}
                    key={typeof video.id === "object" ? video?.id?.videoId : video?.id}
                >
                    <VideoCart props={video} />
                </Link>
            ))}
        </div>
    );
};

export default Videos;