import React from 'react'
import './body.scss'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'
import Powerbi from './Powerbi/Powerbi'

const Body = () => {
  return (
    <>
      <Top/>
      <div className="bottom flex">
      <Powerbi/>
      </div>
    </>
  ) 
}

export default Body
