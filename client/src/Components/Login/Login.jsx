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

import toast from 'react-hot-toast'
import { useAuth } from '../../AuthContext'

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
//usestate hook to store imputs 
const { isAuthenticated, setIsAuthenticated,user,setUser } = useAuth();
const[loginusername, setLoginUsername] = useState("")
const[loginpassword, setLoginPassword] = useState("")
const navigateTo = useNavigate()

const [loginStatus, setLoginStatus] = useState('')
const [statusHolder, setstatusHolder] = useState('message')


const loginUser = (e) => {
  let loadingToastId;
e.preventDefault();
loadingToastId = toast.loading("Signing In");
  Axios.post(`${apiUrl}/login`, {
    //creating variable to send to server through the route
    LoginUsername: loginusername,
    LoginPassword: loginpassword
  }).then((response) => {
    toast.success("Succesfully logged In")
     toast.dismiss(loadingToastId);
  //  console.log(response.data)
    localStorage.setItem("token",response.data.jwtToken);
      setIsAuthenticated(true);   
      setUser(response.data.user)
      // console.log(response.data.user)
  //  if(response.data.message){
  //   console.log(response);
  //   navigateTo('/')
  //   setLoginStatus(`Credentials don't match`)
  //  }
  //  else{
  //   navigateTo('/dashboard/Home')
  //  }
  })
  .catch((error)=>{
    toast.dismiss(loadingToastId);
    toast.error(error.response.data.message);
  })
}

// useEffect(() => {
//   if(loginStatus !==''){
//     setstatusHolder('showMessage')
//     setTimeout(() => {
//       setstatusHolder('message')
//     },4000);

//   }
// }, [loginStatus])
useEffect(()=>{
  if(isAuthenticated){
      switch (user.rank) {
          case 'ACP':
            navigateTo('/dashboard/Home');
            break;
          case 'Inspector':
            // navigateTo('/inspector');
            navigateTo('/inspector');
            break;
          case 'Subinspector':
            // navigateTo('/subinspector');
            navigateTo('/subinspector');
            break;
          default:
            // Redirect to default dashboard or handle other cases
            navigateTo('/dashboard');
            break;
        }
    // navigateTo('/dashboard/Home');
  }
},[isAuthenticated])

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
