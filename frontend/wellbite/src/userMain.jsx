import React from "react";
const UserMain = () => {
    const handleFileChange = async (event) => {
      const image = event.target.files[0];
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData);
        const sendImg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'},
            body: JSON.stringify({img: formData})
        };
        fetch('http://127.0.0.1:5000/checkfood', sendImg).then(response=> response.json()).then(data=>console.log(data)) // Create a local URL for the image
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
            </div>
        </section>
    );
}

export default UserMain;