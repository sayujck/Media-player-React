import React, { useState } from 'react'
import Add from '../Components/Add'
import View from '../Components/View'
import Category from '../Components/Category'
import { Link } from 'react-router-dom'



const Home = () => {
  const [deleteResponseFromView,setDeleteResponseFromView] = useState("")
  const [deleteResponseFromCategory,setDeleteResponseFromCategory] = useState("")
  const [addResponseFromHome,setAddResponseFromHome] = useState("")

  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container mb-5 d-flex justify-content-between">
        <Add setAddResponseFromHome = {setAddResponseFromHome} />
        <Link to={'/history'}>Watch History</Link>
      </div>
      <div className="container-fliud row my-5">
        <div className="col-lg-6">
          <h3>All Videos</h3>
          <View setDeleteResponseFromView={setDeleteResponseFromView} deleteResponseFromCategory={deleteResponseFromCategory} addResponseFromHome={addResponseFromHome} />
        </div>

        <div className="col-lg-6">
          <Category deleteResponseFromView={deleteResponseFromView} setDeleteResponseFromCategory={setDeleteResponseFromCategory} />
        </div>
      </div>
    </div>
  )
}

export default Home
