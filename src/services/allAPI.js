
import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// upload videosAPI = post http rqst called ADD component

export const saveVideoAPI = async (videoDetails)=>{
    return await commonAPI("POST",`${serverURL}/uploadVideos`,videoDetails)
}

// getAllVideosAPI - get http request called view component when component displayed in browser inside its useeffect hook
export const getAllVideosAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/uploadVideos`,"")
}

//saveHistoryAPI - post http rqst to /history called by videocard component when we play video
export const saveHistoryAPI = async (historyDetails)=>{
    return await commonAPI("POST",`${serverURL}/history`,historyDetails)
}

// getAllHistoryAPI - get http rqst called by history component
export const getAllHistoryAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/history`,"")
}

// deleteHistoryAPI -  delete http rqst to history/id called by history component when user clicks on delete button
export const deleteHistoryAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/history/${id}`,{})
}

// removeVideoAPI - delete http rqst from videoCard component when user click delete button on videocard
export const removeVideoAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/uploadVideos/${id}`,{})
}

// saveCategoryAPI - post http rqst to /categories called by category component when user click on add button
export const saveCategoryAPI = async(categoryDetails)=>{
    return await commonAPI("POST",`${serverURL}/categories`,categoryDetails)
}

// getAllCategoryAPI - get http rqst to /categories called by category component when user click on add button
export const getAllCategoryAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/categories`,{})
}

// removeCategoryAPI -  delete http rqst to categories/id called by history component when user clicks on delete button
export const removeCategoryAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/categories/${id}`,{})
}

// updateCategoryAPI - put http rqst to categories/id called by cateogy component when video drop over category
export const updateCategoryAPI = async (categoryDetails)=>{
    return await commonAPI("PUT",`${serverURL}/categories/${categoryDetails.id}`,categoryDetails)
}