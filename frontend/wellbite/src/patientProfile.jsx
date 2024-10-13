import React, { useState } from "react";
import { useEffect } from "react";
const PatientProfile = () =>{
    const [userDetails, setUserDetails] = useState(null)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      }

    useEffect(()=>{
        fetch('/profile/dashboard', options).then(response=> response)
        .then(resp=> {
            setUserDetails(resp.json())
        })
    }, [])
    return (
        <section className="w-screen h-screen bg-blue-100 flex flex-col">
            <div className="w-full h-[10%] bg-blue-400 fixed inset-y-0 flex place-items-center justify-between px-8">
            <h1 className="font-futura text-white text-4xl">WellBite</h1>
            </div>
            <div className="h-[10%] w-full"></div>
            <div className="w-full h-[90%] flex p-x-8">
            <div className="w-[50%] h-full -inset-y-1">
            <div className="w-full h-[30%] flex justify-center place-items-center">
            <svg width="120px" height="120px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="#494c4e" d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z"/>
</svg>
            </div>
            <div className="w-full h-[50%] flex flex-col  justify-between place-items-start mx-64 text-gray-800 font-futura text-2xl">
            <h1>First Name: {userDetails['first_name']}</h1>
            <h1>Last Name: {userDetails['last_name']}</h1>
            <h1>Email: {userDetails['email']}</h1>
            <h1>Doctor in charge: Dr. Nakazawa</h1>
            </div>
            </div>
            <div className="w-[50%] h-full">
                <div className="w-full h-[10%] font-futura flex place-items-center justify-center text-gray-800 text-4xl font-bold">
                    Dietary Restrictions
                </div>
            </div>
            </div>
        </section>
    )
};
export default PatientProfile;