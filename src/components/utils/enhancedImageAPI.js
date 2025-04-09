import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://techhk.aoscdn.com"; // Correct BASE_URL


const enhancedImageAPI = async (file) => {
    try {
        const taskid = await uploadImage(file);
        console.log("Image uploaded successfully, Task ID:", taskid);

        if (!taskid) {
            throw new Error("Failed to obtain Task ID from the API");
        }

        const enhancedImageData = await PollForEnhancedImage(taskid);
        console.log("Enhanced Image Data:", enhancedImageData);
        return enhancedImageData;
    } catch (error) {
        console.error("Error enhancing image:", error.response ? error.response.data : error.message);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);
  
    const { data } = await axios.post(
      `${BASE_URL}/api/tasks/visual/scale`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );
    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task ID not found.");
    }
    return data.data.task_id;

  };
  
const fetchEnhancedImage = async (taskid) => {
 
        const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskid}`, {
            headers: {
                "X-API-KEY": API_KEY,
            },
        });
        if (!data?.data) {
            throw new Error("Failed to fetch image! data not found.");
        }

  return data.data
       
    } 
    const PollForEnhancedImage = async (taskId, retries = 0) => {
        try {
            const result = await fetchEnhancedImage(taskId);
    
            console.log(`Retry ${retries + 1}:`, result);
    
            // Exit when image is successfully processed
            if (result.image) {
                console.log("Enhanced image processing completed:", result.image);
                return result.image; // Return the image URL
            }
    
            // Ensure retries do not go beyond the limit
            if (retries >= 50) {
                throw new Error("Max retries reached. Please try again later.");
            }
    
            console.log("Task is still processing...");
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
            return PollForEnhancedImage(taskId, retries + 1);
    
        } catch (error) {
            console.error("Error polling for enhanced image:", error.message);
            throw error;
        }
    };
    
    
    


export default enhancedImageAPI; // Default export
// {status: 200, message: 'success', data: {…}}
// data
// : 
// {task_id: '59ffe4b2-b8ba-45fe-a24d-3a86474e8338'}
// message
// : 
// "success"
// status
// : 
// 200
// [[Prototype]]
// : 
// Object