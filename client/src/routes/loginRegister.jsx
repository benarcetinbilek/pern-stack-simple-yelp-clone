import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRegister = () => {

  const navigate = useNavigate()

  const [loginOrRegister, setLoginOrRegister] = useState("login")
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInputs({...inputs, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      console.log("qwe")
      fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password
        })
      })
      .then((response)=>{response.json()})
      .then((d)=>{console.log(d);})
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
                    type="email"
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