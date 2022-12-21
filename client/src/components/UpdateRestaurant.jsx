import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = () => {

    let navigate = useNavigate()

  const {id} = useParams()
  
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`)
      setName(response.data.data.restaurant.name)
      setLocation(response.data.data.restaurant.location)
      setPriceRange(response.data.data.restaurant.price_range)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    })
    navigate("/")
  }

  return (
    <div> 
      <form action=''>
        <div className="form-group">
          <label htmlFor='name' >Name</label>
          <input
            id='name' 
            className='form-control' 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor='location' >Location</label>
          <input 
            id='location' 
            className='form-control' 
            type="text"  
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor='price-range' >Price-range</label>
          <input 
            id='price-range' 
            className='form-control' 
            type="number"  
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant