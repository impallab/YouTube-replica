import React from 'react'
import Videos from './Videos'
import { useSelector } from 'react-redux';
const Feed = () => {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <div className={`relative overflow-y-auto mr-4 mt-10 ${isOpen ? "ml-60" : "ml-28"}`}>
            <Videos />
        </div>
    )
}

export default Feed