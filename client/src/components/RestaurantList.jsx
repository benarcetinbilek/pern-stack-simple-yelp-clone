import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RenderRating from './RenderRating'
import StarRating from './StarRating'

function RestaurantList() {

    let navigate = useNavigate()

    const {restaurants, setRestaurants} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const handleRestaurantSelect = async (id) => {
        const response = await fetch("http://localhost:4000/auth/is-verify", {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes = await response.json()
        if(parseRes) {  
            navigate(`/restaurants/${id}`)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        
        navigate(`/restaurants/${id}/update`)
        
    }
    
    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className='text-warning' >0 reviews</span>
        }
        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className='text-warning ml-1'>({restaurant.count})</span>
            </>
        )
    }

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className='bg-primary '>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>    
            <tbody>
                {
                    restaurants && restaurants.map(restaurant => {
                        return (
                        <tr onClick={()=>handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                               <button onClick={(e)=>handleUpdate(e, restaurant.id)} className='btn btn-warning' >Update</button>
                            </td>
                            <td>
                                <button 
                                    className='btn btn-danger' 
                                    onClick={(e) => handleDelete(e, restaurant.id)} 
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>        
    </div>
  )
}

export default RestaurantList