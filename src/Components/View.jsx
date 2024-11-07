import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'

const View = ({addResponseFromHome,deleteResponseFromCategory,setDeleteResponseFromView}) => {
  const [deleteVideoResponseFromVideoCard,setDeleteVideoResponseFromVideoCard] = useState("")
  const [allVideos,setAllVideos] = useState([])


  useEffect(()=>{
    getAllVideos()
  },[addResponseFromHome,deleteVideoResponseFromVideoCard,deleteResponseFromCategory])

  console.log(allVideos);
  
  const getAllVideos = async()=> {
    try {
      const result = await getAllVideosAPI()
      console.log(result);
      if(result.status>=200 && result.status<300) {
        setAllVideos(result.data)
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const dragOverView = (e)=> {
    e.preventDefault()
  }

  const categoryVideoDropOverView =async (e)=> {
    console.log("Inside categoryVideoDropOverView");
    const {video,category} = JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,category);
    const updatedCategoryVideoList = category?.allVideos?.filter(item=>item.id!=video?.id)
    const updatedCategory = {...category,allVideos:updatedCategoryVideoList}
    console.log(updatedCategory);
    // updating the category by deleting video from categories using API
    const result = await updateCategoryAPI(updatedCategory)
    // use state lifting to communicate data from view to category
    setDeleteResponseFromView(result)
    // use API to upload video
    await saveVideoAPI(video)
    // call getAllVideo fn
    getAllVideos()
    
  }

  return (
    <>
     <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDropOverView(e)} >
        {
          allVideos?.length>0?
          allVideos?.map(video=>(
            <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4}> 
             <VideoCard setDeleteVideoResponseFromVideoCard = {setDeleteVideoResponseFromVideoCard} displayData={video}/>
            </Col>
          ))
          :
          <div className="fw-bolder text-danger">No videos uploaded yet</div>
        }
     </Row>      
    </>
  )
}

export default View
