import React,{useState, useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../Assets/Chatappimage.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../Utilities/APIRoutes";


function Login(){
    const navigate=useNavigate()
    const [Values, setValues]= useState({
        username: "",
        password: "",
    });
const HandleChange=(e)=>{
        setValues({...Values, [e.target.name]: e.target.value})
}
const ToastStyling ={
    position:"bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme:"dark"

};
const HandleValidation=()=>{
    const {username,password}=Values;
    if(password===""){
        toast.error("Password is required.",ToastStyling);
      return false;
    }
    else if(username.length===""){
        toast.error("Username or Email is required.", ToastStyling);
        return false;
    }
    return true;
}

const HandleSubmit=async (e)=>{
        e.preventDefault();
       if(HandleValidation()){
        const{username, password}= Values;
            const {data}= await axios.post(loginRoute, {
                username,
                password
            });
            if(data.status===false){
                toast.error(data.msg, ToastStyling);
            }
            if(data.status===true){
               localStorage.setItem("Chat-App_User", JSON.stringify(data.UserPostLogin));
                navigate("/");
            }
       };
        
}
useEffect(()=>{
  if(localStorage.getItem("Chat-App_User")){
    navigate("/");
  }
});
   
 
    

  
  return<>
  <FormContainer>
    <form onSubmit={(event)=>HandleSubmit(event)}>
    <div className="brand">
        <img src={Logo} alt="Logo" />
        <h1>ChatApp</h1>
    </div>
    <input type="text"
     placeholder="Username" 
     name="username" 
     onChange={(e)=>HandleChange(e)}
    >
    </input>
    <input type="password"
     placeholder="Password" 
     name="password" 
     onChange={(e)=>HandleChange(e)}
    >
    </input>
    <button type="submit">LogIn</button>
    <span>Don't have an Account? <Link to="/register">Register</Link></span>
    </form>

  </FormContainer>
  <ToastContainer/>
  </>
  
}
const FormContainer= styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color:#131324;
    .brand{
        display:flex;
        justify-content:center;
        gap: 1rem;
        align-items:center;
            img{
                height:5rem;
                border-radius: 0.6rem; 
            }
            h1{
                color:white;
            }
    }
    form{
        display:flex;
        flex-direction: column;
        gap: 2rem;
        background-color:#00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
           background-color: transparent;
           padding:1rem;
           border:0.1rem solid #4e0eff;
           border-radius: 0.4 rem;
           width:100%;
           font-size:1.1rem;
           color: white;
           &:focus{
            border:0.1rem solid #997af0;
            outline:none;
            color:white;
           }
        }
        button{
                background-color: #997af0;
                color: black;
                padding: 1rem 2rem;
                border: none;
                font-weight:bold;
                cursor:pointer;
                border-radius:0.4rem;
                font-size: 1rem;
                text-transform:uppercase;
                transition:0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
                color: white;
                
            }
        }
    
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#04A777;
                font-weight:bold;
                text-decoration:none;
            }
        }


    }`
export {Login, FormContainer };
