import React from "react";
import { useState } from "react";
const UserMain = () => {
    const [preview, setPreview] = useState(null);

    const handleFileChange =async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        const sendImg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({img: formData})
        };
        fetch('/checkimage', sendImg).then(response=> response.json()).then(data=>console.log(data)) // Create a local URL for the image
      }
    };

    return (
        <section className="w-screen h-screen bg-blue-100">
            <div className="w-full h-full flex justify-center place-items-center flex-col">
        <input 
            type="file" 
            id="file" 
            onClick={handleFileChange}
            accept="image/*"
             />


               {preview && <img src={preview} alt="preview" style={{ width: '300px', marginTop: '20px' }} />}
            </div>
        </section>
    );
}

export default UserMain;