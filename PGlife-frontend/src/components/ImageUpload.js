import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const ImageUpload = ({ propertyId, onUploadComplete }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images[]", image);
    });
    formData.append("property_id", propertyId);

    setUploading(true);
    try {
      const response = await axios.post("/pglife/uploadImage.php", formData);

      console.log("Upload Response:", response.data);
      
      if (response.data.status === "success") {
        alert("Images uploaded successfully!");
        setImages([]);
        if (onUploadComplete) {
          onUploadComplete(); 
        }
      } else {
        alert("Failed to upload images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-3">
      <input type="file" multiple onChange={handleImageChange} className="form-control mb-2" />
      <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? (
          <>
            <Spinner animation="border" size="sm" /> Uploading...
          </>
        ) : (
          "Upload Images"
        )}
      </button>
    </div>
  );
};

export default ImageUpload;
