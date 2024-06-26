import axios from "axios";
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import formatCount from "../utils/formatCounter";
// import Duration from "./Duration";

const VideoCart = ({ props }) => {
    //fetch channelIcon:
    const [channelIcon, setChannelIcon] = useState("");

    const getChannelIcon = async () => {
        try {
            const channelData = await axios.get(`${import.meta.env.VITE_YOUTUBE_VIDEO_BY_ID}${props.snippet.channelId}&key=${import.meta.env.VITE_YOUTUBE_VIDEO_API_KEY}`);
            // fetch each channels details.
            // console.log(channelData)
            setChannelIcon(channelData.data?.items[0]?.snippet?.thumbnails?.high?.url || channelData.data?.items[0]?.snippet?.thumbnails?.default.url || "");
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getChannelIcon();
    }, [])

    return (
        <div className="w-full mb-8 shadow-black/100 shadow-lg rounded-lg cursor-pointer opacity-100 hover:opacity-50 animated-border hover:border transition-opacity duration-250">
            <img
                src={
                    props.snippet?.thumbnails?.maxres?.url ||
                    props.snippet?.thumbnails?.standard?.url ||
                    props.snippet?.thumbnails?.high?.url ||
                    props.snippet?.thumbnails?.medium?.url ||
                    props.snippet?.thumbnails?.default?.url ||
                    'https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1.jpg'
                }
                alt="thumnail"
                className="rounded-2xl w-full"
            />
            {/* {
                props?.lengthSeconds && (
                    <Duration time={props?.lengthSeconds} />
                )
            } */}
            <div className="flex gap-3 p-2 font-bold">
                <div>
                    <Avatar src={channelIcon} size="37" className="rounded-full" />
                </div>
                <div>{props.snippet?.localized?.title}</div>
            </div>
            <div className="ml-12 font-medium text-sm mt-2 text-blue-600">
                {props.snippet?.channelTitle}
            </div>
            <div className="flex gap-3 mt-2 pb-2 ml-12 text-sm text-white/60">
                <p>{formatCount(props.statistics?.viewCount) + " views"}</p>
                <p>{new Date(props.snippet?.publishedAt).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default VideoCart