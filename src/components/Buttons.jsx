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
        < NavLink to="#" key={index} onClick={() => categoryByButton(buttonName)} className={`${active == buttonName ? "bg-blue-600 text-white border border-white animate-bounce tracking-widest px-6" : "bg-white/30 text-white"} z-1 mt-24 mx-2  font-medium  py-1 px-2  rounded-md select-none `} >{buttonName}</NavLink>
      )
    })
  )
}

export default Buttons