import React, { useContext } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import { RestaurantsContext } from '../context/RestaurantsContext'

function Home() {

  const {setIsAuthenticated} = useContext(RestaurantsContext)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
      <button onClick={handleLogout} className='btn btn-primary mx-auto d-flex flex-row-reverse'>Logout</button>
    </div>
  )
}

export default Home