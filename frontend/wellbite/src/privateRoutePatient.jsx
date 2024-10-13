import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const PrivateRoutePatient=({children})=>{
    const navigate = useNavigate()
    const [jwt, setJwt] = useState(null) 
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json'
        }
    }

    useEffect(()=>{
        fetch('/user/verifypatient', options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
    }, [])
    
   
    
    return  jwt === 200 ? children : navigate('/doctor/dashboard')
};

export default PrivateRoutePatient;