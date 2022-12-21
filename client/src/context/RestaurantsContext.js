import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext() 

export const RestaurantsContextProvider = props => {

    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const addRestaurant = restaurant => {
        setRestaurants([...restaurants, restaurant])
    }

    return(
        <RestaurantsContext.Provider 
            value={
                {
                        restaurants, 
                        setRestaurants, 
                        addRestaurant,
                        selectedRestaurant,
                        setSelectedRestaurant,
                        isAuthenticated,
                        setIsAuthenticated
                }
            } >
            {props.children}
        </RestaurantsContext.Provider>
    )

}


