import React, { useContext, useState } from "react";
import "./login.scss"
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// For Create React App
const apiUrl = process.env.REACT_APP_API_URL;



const Login = () => {
    
    const navigate = useNavigate()
    
    const [credentials , setCredentials] = useState({
        username : undefined,
        password : undefined
    })
    const {loading , error, dispatch} = useContext(AuthContext)
    
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev,[e.target.id] : e.target.value}))
    }
    
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            console.log(apiUrl)
            const res = await axios.post(`${apiUrl}/auth/login` , credentials)
            console.log("Axios response:", res);
            console.log(res)
            console.log(apiUrl)

            if (res && res.data && res.data.isAdmin){
              dispatch({type : "LOGIN_SUCCESS" , payload : res.data.details })
              navigate("/")
            } else{
            dispatch({type:"LOGIN_FAILED" , payload : {message: "You are Not allowed!"}})
            }
            navigate("/")
        } catch (err) {
             dispatch({type:"LOGIN_FAILED" , payload : { message: err.message }})
        }
    }
    
    
    
    return (
        <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"/>
            <button disabled = {loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
        
        
        </div>
    )
}

export default Login;