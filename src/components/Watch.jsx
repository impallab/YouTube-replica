import React from 'react'
import { useSelector } from 'react-redux'
function Watch() {
    const isOpen = useSelector((store) => store.app.isOpen);
    return (
        <div className={`${isOpen ? "ml-60" : "ml-28"}`}>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eveniet alias ea repellendus et aut veniam! Voluptates dolores temporibus omnis reprehenderit tenetur, perferendis explicabo molestias autem eos dicta quasi eligendi.
            </div>
        </div>
    )
}

export default Watch