import { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllHistoryAPI } from '../services/allAPI'
import { deleteHistoryAPI } from '../services/allAPI'


const History = () => {
  const [allHistory,setAllHistory] = useState()

  useEffect(()=>{
    getAllHistory()
  },[])

  console.log(allHistory);
  
  const getAllHistory = async ()=> {
    try {
      const history = await getAllHistoryAPI()
      if(history.status>=200 && history.status<300) {
        setAllHistory(history.data)
      }
    }
    catch(err) {
      console.log(err);
      
    }
  }

  const removeHistory = async (id)=> {
    try {
      await deleteHistoryAPI(id)
      getAllHistory()
    }
    catch(err) {
      console.log(err);
      
    }
  }

  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className="container my-5 table">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
        {
          allHistory?.length>0?
          allHistory?.map((watchHistory,index) =>(
          <tr key={watchHistory?.id}>
            <td>{index+1}</td>
            <td>{watchHistory?.caption}</td>
            <td><a>{watchHistory?.youTubeLink}</a></td>
            <td>{watchHistory?.timeStamp}</td>
            <td><button onClick={()=>removeHistory(watchHistory?.id)} className='btn' ><i className='fa-solid fa-trash text-danger'></i></button></td>
          </tr>
          )):
          <div>Watch history is empty</div>
        }
        </tbody>
      </table>
    </div>
  )
}

export default History
