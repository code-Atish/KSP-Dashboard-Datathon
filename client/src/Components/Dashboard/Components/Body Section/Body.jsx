import React from 'react'
import './body.scss'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'
import Powerbi from './Powerbi/Powerbi'
import { useNavigation } from 'react-router-dom'
import Loader from '../../../../ui/Dropdown/Loader'

const Body = () => {
  const navigation = useNavigation()
  if(navigation.state === "loading"){
    return <Loader/>
  }
  return (
    <>
      {/* <Top/> */}
      <div className="bottom flex">
      <Powerbi/>
      </div>
    </>
  ) 
}

export default Body
