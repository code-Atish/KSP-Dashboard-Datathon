import {  useEffect, useState } from 'react';
import './App.css'
import Body from './Components/Dashboard/Components/Body Section/Body';
import InspectorBody from './Components/InspectorDash/Components/Body Section/Body';
import SubinspectorBody from './Components/SubInspectorDash/Components/Body Section/Body';
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
import DetailedFir from './Components/FirDetails/DetailedFir';
import Details from './Components/Details/Details';
import SubordinateDetails from './Components/SubordinateDetails/Details/Details';
import OfficersList from './Components/Officers/OfficersList';
import FirList from './Components/FirDetails/FirList';
import AddFir from './Components/FirDetails/AddFir';
const apiUrl = import.meta.env.VITE_API_URL;

// Define the ProtectedRoute component
function useFetchData(url,config) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url,config);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
  };
  fetchData();
  }, [url]);

  return { data, isLoading, error };
}

const ProtectedRoute = ({ element: Element }) => {
  // Check authentication status here (dummy logic for demonstration)
  // const [isAuthenticated,setIsAuthenticated]=useState(false)
  let isValid=false

  // const isAuthenticated = localStorage.getItem("token") !== null;
const { isAuthenticated,user, setUser,setIsAuthenticated } = useAuth();

const jwt_token = localStorage.getItem("token");
if (isAuthenticated && jwt_token){
  isValid = true;
}
 else if(!isAuthenticated && jwt_token){
   const { data  , isLoading, error} = useFetchData(`${apiUrl}/verify`,{
     headers : {
       "jwt_token" : localStorage.getItem('token')
     }
   })
    
   if(isLoading || !data)  {
    console.log(isLoading)
     return <div> verifying...</div>
   }
   if(error){
    isValid = false
   }
   if(data){
    isValid = true
    setIsAuthenticated(true)
   }
   
}


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
  return (isValid ? Element : <Navigate to="/" />); // Use Navigate for createBrowserRouter

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
        path: "home",
        // index: true,
        element: <Body />,
      },
      {
        path: "officers",
        // element: <div>hello world</div>,
        // element: <Officers />,
        // loader: OfficersLoader,
        element : <OfficersList/>,
        children : [
          {
            path: "officerdetails/:id",
            element: <div><SubordinateDetails/></div>
          },
          {
            // path: "officerdetails/:id",
            element: <div><Officers/></div>,
            index : true
          }
        ]
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
        element: <div><FirList/></div>,
        // element: <Details/>,
        children : [
          {
            element : <FirTable/>,
            index: true
          },
          {
            path: ":FirNo/:FirYear",
            element : <DetailedFir/>,
          }
        ]
      },
      {
        path: "addfir",
        element: <div><AddFir/></div>,
        // element: <Details/>,
      },
    ],
  },
  {
    path: "/inspector",
    element: <div><ProtectedRoute element={<InspectorDash/>}/></div>,
    children: [
      {
        index: true, 
        path: 'home',
        element : <InspectorBody/>
      },
      {
        path: "officers",
        // element: <div>hello world</div>,
        // element: <Officers />,
        // loader: OfficersLoader,
        element : <OfficersList/>,
        children : [
          {
            path: "officerdetails/:id",
            element: <div><SubordinateDetails/></div>
          },
          {
            // path: "officerdetails/:id",
            element: <div><Officers/></div>,
            index : true
          }
        ]
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
        path: "firdetails",
        // loader: FirLoader,
        element: <div><FirList/></div>,
        // element: <Details/>,
        children : [
          {
            element : <FirTable/>,
            index: true
          },
          {
            path: ":FirNo/:FirYear",
            element : <DetailedFir/>,
          }
        ]
      },
      {
        path: "addfir",
        element: <div><AddFir/></div>,
        // element: <Details/>,
      },
    ]
  },
  {
    path: "/subinspector",
    element: <div><ProtectedRoute    element = {<SubinspectorDash />} /></div>,
    
    children: [
      {
        // index: true,
        path: 'home',
        element : <SubinspectorBody/>
      },
      {
        path: "officers",
        // element: <div>hello world</div>,
        // element: <Officers />,
        // loader: OfficersLoader,
        element : <OfficersList/>,
        children : [
          {
            path: "officerdetails/:id",
            element: <div><SubordinateDetails/></div>
          },
          {
            // path: "officerdetails/:id",
            element: <div><Officers/></div>,
            index : true
          }
        ]
      },
      , 
      {
        path: "location",
        element: <div><Map2/></div>,
      },
      {
        path: "profile",
        element: <div><Details/></div>,
      },
      {
        path: "firdetails",
        // loader: FirLoader,
        element: <div><FirList/></div>,
        // element: <Details/>,
        children : [
          {
            element : <FirTable/>,
            index: true
          },
          {
            path: ":FirNo/:FirYear",
            element : <DetailedFir/>,
          }
        ]
      },
      {
        path: "addfir",
        element: <div><AddFir/></div>,
        // element: <Details/>,
      },
    ]
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
 