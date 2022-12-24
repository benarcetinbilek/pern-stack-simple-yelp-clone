import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RestaurantsContextProvider } from './context/RestaurantsContext'
import Home from './routes/Home'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import UpdatePage from './routes/UpdatePage'
import LoginRegister from './routes/loginRegister'
import PrivateRoutes from "./routes/privateRoutes"

const App = () => {
    
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path='/loginRegister' element={<LoginRegister />} />
                        <Route element={<PrivateRoutes />}> 
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='/restaurants/:id/update' element={<UpdatePage />} />
                            <Route exact path='/restaurants/:id' element={<RestaurantDetailPage />} />
                        </Route>
                    </Routes>       
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App 