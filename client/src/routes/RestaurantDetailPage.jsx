import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReviews from '../components/AddReviews'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantsContext } from '../context/RestaurantsContext'

function RestaurantDetailPage() {

  const {id} = useParams()
  console.log(id)

  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

  useEffect(()=> {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`)
      console.log(response)
      setSelectedRestaurant(response.data.data)
    }
    fetchData()
  },[])

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
          <div className='text-center '>
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className='text-warning ml-1'>
              {
                selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"
              }
            </span>
          </div> 
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReviews />
        </>
    )}</div>
  )
}

export default RestaurantDetailPage