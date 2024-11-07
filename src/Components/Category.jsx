import React,{useState} from 'react'
import { Modal,Form,FloatingLabel,Button } from 'react-bootstrap'
import { getAllCategoryAPI, removeCategoryAPI, removeVideoAPI, saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import { useEffect } from 'react';
import VideoCard from './VideoCard';


const Category = ({setDeleteResponseFromCategory,deleteResponseFromView}) => {
  const [categoryName,setCategoryName] = useState("")
  const [show, setShow] = useState(false);
  const [allCategory,setAllCategory] = useState()

  useEffect(()=>{
    showCategory()
  },[deleteResponseFromView])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveCategory = async() =>{
    if(categoryName) {
      const categoryDetails = {categoryName,allVideos:[]}
      try {
        const result = await saveCategoryAPI(categoryDetails)
        if(result.status>=200 && result.status<300){
          alert("Category Created")
          handleClose()
          showCategory()
        }
      }
      catch(err){
        console.log(err);
        
      }
    }
    else {
      alert("Provide Category Name")
    }
  }
  
  const showCategory = async () => {
    try {
      const result = await getAllCategoryAPI()
      if(result.status>=200 && result.status<300) {
        setAllCategory(result.data)
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  const removeCategory = async (id) => {
    try {
      await removeCategoryAPI(id)
      showCategory()
      
    } catch (err) {
      console.log(err);
      
    }
  }

  const dragOverCategory = (e)=>{
    e.preventDefault()
  }

  const videoCardDropCategory = async (e,category)=>{
    console.log("Inside videoCardDropOverCategory");
    const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
    console.log(videoDetails);
    category.allVideos.push(videoDetails)
    console.log(category);
    // api call to make update the category
    await updateCategoryAPI(category)
    showCategory()
    const result = await removeVideoAPI(videoDetails.id)
    setDeleteResponseFromCategory(result)
    
  }

  const categoryVideoDragStarted = (e,dragVideoDetails,category) => {
    console.log("Inside categoryVideoDragStarted");
    let dragData = {video:dragVideoDetails,category}
    e.dataTransfer.setData("dragData",JSON.stringify(dragData))
  }

  return (
    <>
     <div className='d-flex justify-content-around align-items-center'>
      <h3>All Categories</h3>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
     </div>

     {/* display all category */}
         <div className="container-fluid mt-3">
          {/* single category view */}

          {
            allCategory?.length>0?
            allCategory?.map(category=>(
              <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCardDropCategory(e,category)} key={category?.id} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between">
                <h5>{category?.categoryName}</h5>
                <button onClick={()=>removeCategory(category?.id) } className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
              </div>
               {/* display category videos */}
            <div className="row mt-2">
            {
              category?.allVideos?.length>0 && 
              category?.allVideos?.map(video=>(
                <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,category)} key={video?.id} className="col-lg-4">
                {/* video card */}
                  <VideoCard insideCategory={true} displayData={video}/>
                </div>
              ))
             }
            </div>
              </div>
            ))
          :
          <div>No Category</div>
        }
            
           
          </div>
    <Modal
       centered show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel className='mt-2' controlId="floatingCategoryName" label="Category Name">
        <Form.Control onChange={e=>setCategoryName(e.target.value)} type="text" placeholder="Category Name" />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancel
          </Button>
          <Button onClick={handleSaveCategory} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Category
