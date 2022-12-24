import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'

const LoginRegister = () => {

  const navigate = useNavigate()

  const {isAuthenticated, setIsAuthenticated, inputs, setInputs} = useContext(RestaurantsContext)

  const [loginOrRegister, setLoginOrRegister] = useState("login")
  

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInputs({...inputs, [name]: value})
  }

  useEffect(()=>{
    const refreshPage = async () => {
      try {
        
        const response = await fetch("http://localhost:4000/auth/is-verify", {
          method: "GET",
          headers: {token: localStorage.token}
        })
        const parseRes = await response.json()
        if(parseRes ===true) {  
          setIsAuthenticated(true)
          navigate(`/`)
        }
      } catch (error) {
        console.log(error);
      }
    }
    refreshPage()
  },[])

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(loginOrRegister === 'login'){
        const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password
        })
      })
        const parseRes = await response.json()
        localStorage.setItem("token", parseRes.token)
        if (parseRes.token){
          setIsAuthenticated(true)
          navigate("/")
        }
      }else{
        const response = await fetch("http://localhost:4000/auth/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
          })
        })
        const parseRes = await response.json()
        localStorage.setItem("token", parseRes.token)
        if (parseRes.token){
          setIsAuthenticated(true)
          navigate("/")
        }
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title text-center">{loginOrRegister}</h3>
            {
              loginOrRegister === "register" ? 
                <div className="form-group mt-3">
                    <label>Full Name</label>
                    <input
                    value={inputs.name}
                    onChange= {handleChange}
                    name="name"
                    type="text"
                    className="form-control mt-1"
                    placeholder="e.g Jane Doe"
                    />
                </div> :
                <></>
            }
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={inputs.email}
              name="email"
              onChange= {handleChange}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input 
              value={inputs.password}
              name="password"
              onChange= {handleChange}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" >
              Submit
            </button>
          </div>
          <div className="text-center mt-2">
            {loginOrRegister === "login" ? "Not registered? " : "Already registered? "}
            <span className="link-primary" >
              {
                loginOrRegister === "login" ? 
                  <p onClick={()=>{setLoginOrRegister("register")}}>register</p> : 
                  <p onClick={()=>{setLoginOrRegister("login")}}>login</p>
              }
            </span>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginRegister
