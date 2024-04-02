import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCategoryVideos } from '../utils/appSlice';


const categories = ["All", "Songs", "Trending", "Mixes", "JavaScript", "AI", "Music", "News", "Cricket", "Live", "Exams", "Interview", "Tech", "Astronomy", "Podcasts", "Movies", "Fitness", "Programming", "Motivation"]

const Buttons = () => {
  const [active, setActive] = useState("All")
  const dispatch = useDispatch();
  const categoryByButton = (buttonText) => {
    // alert(name)
    dispatch(setCategoryVideos(buttonText));
    setActive(buttonText)
  }
  return (
    categories.map((buttonName, index) => {
      return (
        < NavLink to="#" key={index} onClick={() => categoryByButton(buttonName)} className={`${active == buttonName ? "text-white border border-white  tracking-widest px-6 bg-red-600 animate-pulse xs:animate-bounce mds:bg-green-600 mds:animate-pulse sm:bg-red-600 sm:animate-bounce lg:bg-red-600 lg:animate-bounce xl:bg-blue-800 xl:animate-pulse 2xl:bg-black 2xl:animate-bounce" : "bg-white/30 text-white"} z-1 mt-[12vh] mx-2 font-semibold rounded-lg  py-1 px-2   select-none `} >{buttonName}</NavLink>
      )
    })
  )
}

export default Buttons