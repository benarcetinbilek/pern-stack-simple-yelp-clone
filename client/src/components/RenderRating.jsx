import React from "react"
import StarRating from "./StarRating"

const RenderRating = ({restaurant}) => {
    console.log(restaurant)
    return(
        <>
        {
            !restaurant.count ? 
                <span className='text-warning'>0 reviews</span> 
            :
                <>
                    <StarRating rating={restaurant.id}/>
                    <span className='text-warning ml-1' >({restaurant.count})</span>
                </>
        }
        </>
    )
}

export default RenderRating