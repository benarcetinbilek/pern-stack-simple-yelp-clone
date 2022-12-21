import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'

const PrivateRoutes = () => {

    const {isAuthenticated, setIsauthenticated} = useContext(RestaurantsContext)

    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/loginRegister"/>
    )
}

export default PrivateRoutes