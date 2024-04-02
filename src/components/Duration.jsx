import moment from 'moment'
import React from 'react'


const Duration = ({ time }) => {
    const videoLength = () => moment()
        .startOf("day")
        .seconds(time)
        .format("H:mm:ss");
    return (
        <div className='absolute bottom-2 right-2 bg-white/25 text-white text-xs rounded-md'>
            {Duration}
        </div>
    )
}

export default Duration