import React, {useEffect,useState} from 'react'
import './Login.css'
import '../../App.scss'
import { Link, useNavigate } from 'react-router-dom'

import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { GiRank3 } from "react-icons/gi";
import { AiOutlineSwapRight } from "react-icons/ai";
import Axios from 'axios'


const Login = () => {
//usestate hook to store imputs 
const[loginusername, setLoginUsername] = useState("")
const[loginpassword, setLoginPassword] = useState("")
const navigateTo = useNavigate()

const [loginStatus, setLoginStatus] = useState('')
const [statusHolder, setstatusHolder] = useState('message')


const loginUser = (e) => {

e.preventDefault();

  Axios.post('/api/login', {
    //creating variable to send to server through the route
    LoginUsername: loginusername,
    LoginPassword: loginpassword
  }).then((response) => {
   console.log()

   if(response.data.message){
    navigateTo('/')
    setLoginStatus(`Credentials don't match`)
   }
   else{
    navigateTo('/dashboard')
   }
   
  })
}

useEffect(() => {
  if(loginStatus !==''){
    setstatusHolder('showMessage')
    setTimeout(() => {
      setstatusHolder('message')
    },4000);

  }
}, [loginStatus])

  return (
    <div className= 'loginPage flex'>
      <div className="container flex">

        <div className="videoDiv">
          <video src={video} autoPlay muted loop>

          </video>
        

        <div className="textDiv">
        <h2 className="title">Enhance Efficiency with Our Dashboard</h2>
        <p>Stay organized in law enforcement!</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">Don't have an account ?</span>
          <Link to={"/register"}>
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back</h3>
          </div>

          <form action="" className='form grid'>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor= "username">Username</label>
              <div className="input flex">
              <FaUserShield className='icon'/>
                <input type="text" id="username" placeholder='Enter Username' onChange={(event)=>{
                  setLoginUsername(event.target.value)
                }}/>
              </div>
            </div>

            
            <div className="inputDiv">
              <label htmlFor= "password">Password</label>
              <div className="input flex">
              <BsFillShieldLockFill className='icon'/>
                <input type="password" id="password" placeholder='Enter Password' onChange={(event)=>{
                  setLoginPassword(event.target.value)
                }}/>
              </div>
            </div>
{/* 
            <div className="inputDiv">
              <label htmlFor= "rank">Rank</label>
              <div className="input flex">
              <GiRank3 className='icon'/>
                <input type="text" id="rank" placeholder='Enter Rank' />
              </div>
            </div> */}

            <button type='submit' className='btn flex' onClick={loginUser}>
              <span>Login</span>
              <AiOutlineSwapRight  className='icon'/>
            </button>

            <a href="/dashboard">Dashboard</a>
        

            <span className='forgotPassword'>
              Forgot your password <a href="">Click Here</a>

            </span>

            
          </form>
        </div>
    </div>
    </div>
  )
}

export default Login
