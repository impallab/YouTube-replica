import React from 'react';


const categories = ["All", "Mixes", "JavaScript", "AI", "Music", "News", "Live", "Astronomy", "Podcasts", "Cricket", "Tech", "Movies", "New to you"]

const Buttons = () => {

  return (
    categories.map((buttonName, index) => {
      return (
        < div key={index} className='mt-20 mx-2  font-medium bg-white/20 py-1 px-2 rounded-md' >{buttonName}</div>
      )
    })
  )
}

export default Buttons