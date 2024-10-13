import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DetectBarcode from "./detectBarcode";
import FoodCollector from "./manualCollectFood";
const UserMain = () => {
    const [image, setImage] = useState(null);
    const handleFileChange = async (event) => {
      const input_image = event.target.files[0];
      if (input_image){
        const storageRef = ref(storage, `images/${input_image.name}`);
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
            body: JSON.stringify({
                foodSource: 'image', 
                foodList: foodList,
                restrictions: 'Mango, Apple, Banana',
              }),
        });
        const data = await response.json();
        console.log('Food analysis response:', data);
            }
            catch (error) {
            console.error('Error uploading image:', error);
        }

        setImage(input_image);
      }
      
    };

    const submitImage = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            const sendImg = {
                method: 'POST',
                body: formData
            };
            fetch('/checkfood', sendImg).then(response=> response.json()).then(data=>console.log(data)) // Create a local URL for the image
          }
    }
    return (
        <section className="w-screen h-screen bg-blue-100 place-items-center flex juatify-center">
            <div className="w-full h-[10%] bg-blue-400 fixed inset-y-0 flex place-items-center justify-between px-8">
            <h1 className="font-futura text-white text-4xl">WellBite</h1>
            <button className=" bg-transparent rounded-lg text-white">
            <svg className=" stroke-white" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6H20M4 12H20M4 18H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
            </div>

            <div className="w-full h-[68%] flex place-items-center flex-col justify-between">
                <div className="w-[20%] h-[32%] border-dashed border-gray-700 rounded-xl border-2 relative justify-center place-items-center">
        <input className="w-full h-full opacity-0  border-opacity-100 inset-y-0 z-50 absolute cursor-pointer"
            type="file" 
            id="file" 
            onChange={handleFileChange}
            accept="image/*"
            encType="multipart/form-data"
             />
             <div className="w-full h-full bg-white bg-opacity-40 inset-y-0 z-10 absolute rounded-xl place-items-center justify-center">
            <div className="w-full h-[50%] flex justify-center fill-gray-700"> <svg className="py-2" width="80px" height="80px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12a5 5 0 0 1-5 5h-2v-1h2a3.99 3.99 0 0 0 .623-7.934l-.79-.124-.052-.798a5.293 5.293 0 0 0-10.214-1.57L8.17 6.59l-.977-.483A2.277 2.277 0 0 0 6.19 5.87a2.18 2.18 0 0 0-1.167.339 2.205 2.205 0 0 0-.98 1.395l-.113.505-.476.2A4 4 0 0 0 5 16h3v1H5a5 5 0 0 1-1.934-9.611 3.21 3.21 0 0 1 1.422-2.025 3.17 3.17 0 0 1 1.702-.493 3.268 3.268 0 0 1 1.446.34 6.293 6.293 0 0 1 12.143 1.867A4.988 4.988 0 0 1 24 12zm-11-.293l2.646 2.646.707-.707L12.5 9.793l-3.854 3.853.707.707L12 11.707V22h1z"/><path fill="none" d="M0 0h24v24H0z"/></svg></div>
            <div className="w-full h-[50%] font-futura text-gray-700 flex place-items-center justify-center text-sm"><h1 className="-py-4">Upload the photo of your meal here</h1></div>
             </div>
             </div>
             <div className="w-[30%] h-[36%] content-center content-fit flex place-items-center justify-center overflow flex-col">
             {image===null ? <h1>No photo submitted yet</h1>:
                    <img className="w-full h-full z-10 object-contain" src={URL.createObjectURL(image)} alt="#"/>
                }
                {image && <button onClick={()=>setImage(null)}>
                    <svg className="stroke-red-500 fill-red-500 text-red-500" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cross-circle" class="icon glyph"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.42,9.71,15.71a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.58,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.58l2.29-2.29a1,1,0,0,1,1.42,1.42L13.42,12Z"></path></svg>
                    </button>}
             </div>
             <button className="font-futura rounded-xl bg-green-500 px-6 py-4 text-lg text-white disabled:bg-green-300  flex place-items-center justify-between disabled:text-gray-400 disabled:cursor-not-allowed stroke-white disabled:stroke-gray-400" onClick={submitImage} disabled={image===null}>Submit Photo</button>
             <FoodCollector/> 
            </div>
        </section>
    );
}

export default UserMain;