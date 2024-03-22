import React from 'react';
import { NavLink } from 'react-router-dom';


const categories = ["All", "Mixes", "JavaScript", "AI", "Music", "News", "Live", "Astronomy", "Podcasts", "Cricket", "Tech", "Movies", "New to you", "Cricket", "Tech", "Movies", "New to you"]

const Buttons = () => {

  return (
    categories.map((buttonName, index) => {
      return (
        < NavLink to="#" key={index} className=' mt-24 mx-2  font-medium bg-white/20 py-1 px-2 rounded-md' >{buttonName}</NavLink>
      )
    })
  )
}

export default Buttons