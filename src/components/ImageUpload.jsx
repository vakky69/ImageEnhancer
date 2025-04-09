import React from 'react'

const ImageUpload = (props) => {
  const ShowImageHandler=(e)=>{
   const file=e.target.files[0]
   if(file){
    props.UploadImageHandler(file)
   }
  }
    return (
      <div className="image-upload-container">
        <label
          htmlFor="fileInput"
          className="file-input-label"
        >
          <input type="file" id="fileInput" className="hidden-input" onChange={ShowImageHandler} />
          <span className="upload-text">
            Click and drag to upload your image
          </span>
        </label>
      </div>
    );
  };

export default ImageUpload