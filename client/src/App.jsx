import {  useEffect, useState } from 'react';
import './App.css'
import Body from './Components/Dashboard/Components/Body Section/Body';
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'  
import Register from './Components/Regsiter/Register'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import AuthProvider, { useAuth } from './AuthContext';
import Officers,{loader as OfficersLoader} from './Components/Officers/Officers';
import InspectorDash from './Components/InspectorDash/InspectorDash';
import SubinspectorDash from './Components/SubInspectorDash/SubinspectorDash';
import MapComponent from './Components/Map/MapComponent';
import Map2 from './Components/Map/Map2';
import LandingPage from './Pages/Homepage/Landingpage';
import FirTable from './Components/FirDetails/Firdetails';
import Details from './Components/Details/Details';
import SubordinateDetails from './Components/SubordinateDetails/Details/Details';

// Define the ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  // Check authentication status here (dummy logic for demonstration)
  // const [isAuthenticated,setIsAuthenticated]=useState(false)


  // const isAuthenticated = localStorage.getItem("token") !== null;
const { isAuthenticated } = useAuth();


  const jwt_token = localStorage.getItem("token");
  // useEffect(()=>{
  //  const verifyUser= async () =>{
  //   try {
  //     const res = await axios.get('http://localhost:5000/verify', {
  //         headers: {
  //             "jwt_token": jwt_token,
  //         }
  //    })
  //    const isValid=res.data
  //    setIsAuthenticated(isValid)
  // } catch (error) {
  //   // toast.error(res.data.error)
  //   console.log(error)
  // }
  //  }
  //  verifyUser()
  // })

  // If authenticated, render the provided element; otherwise, render an unauthorized message
  return (isAuthenticated ? Element : <Navigate to="/" />); // Use Navigate for createBrowserRouter

};


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <LandingPage/>
    </div>,
  },
  {
    path: "/login",
    element: <div><Login/></div>,
  },
  {
    path: "/register",
    element: <div><Register/></div>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute    element = {<Dashboard />} />,
    children: [
      {
        path: "Home",
        // index: true,
        element: <Body />,
      },
      {
        path: "inspectors",
        // element: <div>hello world</div>,
        element: <Officers />,
        // loader: OfficersLoader
      },
      {
        path: "checkout",
        element: <div>hi</div>,
      }, 
      {
        path: "location",
        element: <div><Map2/></div>,
      },
      {
        path: "profile",
        element: <div><Details/></div>,
      },
      {
        path: "details",
        element: <div><Details/></div>,
        // element: <Details/>,
      },
      {
        path: "firdetails",
        // loader: FirLoader,
        element: <div><FirTable/></div>,
        // element: <Details/>,
      },
      {
        path: "officerdetails/:id",
        element: <div><SubordinateDetails/></div>
      }
    ],
  },
  {
    path: "/inspector",
    element: <div><InspectorDash/></div>,
  },
  {
    path: "/subinspector",
    element: <div><SubinspectorDash/></div>,
  }

]);

function App() {
  return (
  <div>
    <AuthProvider>
   <RouterProvider router={router} />
    </AuthProvider> 
  </div>
  )
}

export default App
 