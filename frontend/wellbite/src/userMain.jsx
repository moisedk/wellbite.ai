import React from "react";
const UserMain = () => {
    const handleFileChange = async (event) => {
      const image = event.target.files[0];
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);}
        const sendImg = {
            method: 'POST',
            body: formData
        };
        fetch('/checkfood', sendImg).then(response=> response.json()).then(data=>console.log(data)) // Create a local URL for the image
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
            encType="multipart/form-data"
             />
            </div>
        </section>
    );
}

export default UserMain;