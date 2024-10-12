import React from "react";
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const UserMain = () => {
    const handleFileChange = async (event) => {
      const image = event.target.files[0];
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        try {
        // Upload image to Firebase Storage
        await uploadBytes(storageRef, image);
        // Get download URL
        const url = await getDownloadURL(storageRef);
        console.log('Image uploaded successfully:', url);

        // Send the image URL to Cloudflare Worker for analysis
        const response = await fetch('http://localhost:8787', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: url }),
        });
        const data = await response.json();
        console.log('Food analysis response:', data);
            }
            catch (error) {
            console.error('Error uploading image:', error);
        }

        const formData = new FormData();
        formData.append('image', image);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);}
        const sendImg = {
            method: 'POST',
            body: formData
        };
        // fetch('/checkfood', sendImg).then(response=> response.json()).then(data=>console.log(data)) // Create a local URL for the image
      }
    };

    return (
        <section className="w-screen h-screen bg-blue-100">
            <div className="w-full h-full flex justify-center place-items-center flex-col">
        <input 
            type="file" 
            id="file" 
            onChange={handleFileChange}
            accept="image/*"
            encType="multipart/form-data"
             />
            </div>
        </section>
    );
}

export default UserMain;