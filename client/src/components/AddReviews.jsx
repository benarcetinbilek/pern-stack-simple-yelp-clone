import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const AddReviews = () => {

    const {id} = useParams()

    const [name, setName] = useState("")
    const [rating, setRating] = useState("rating")
    const [reviewText, setReviewText] = useState("")

    const handleSubmit = async (e) => {
        await RestaurantFinder.post(`/${id}/addReview`, {
            name,
            review: reviewText,
            rating
        })
    }

  return (
    <div className='mb-2'>
        <form action=''>
            <div className="form-row"style={{display: "flex", justifyContent:"space-between"}}>
                <div className="form-group col-8 mb-2">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id='name' 
                        placeholder='name' 
                        className='form-control' 
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        />
                </div>
                <div className="form-group col-3">
                    <label htmlFor="rating">Rating</label>
                    <select 
                        className='custom-select form-control' 
                        id="rating"
                        value={rating}
                        onChange={e=>setRating(e.target.value)}    
                    >
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="Review">Review</label>
                <textarea 
                    id='Review' 
                    className='form-control'
                    value={reviewText}
                    onChange={e=>setReviewText(e.target.value)}    
                ></textarea>
            </div>
            <button onClick={e=>handleSubmit(e)} className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddReviews