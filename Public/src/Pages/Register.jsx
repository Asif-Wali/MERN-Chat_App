import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Assets/Chatappimage.jpg";

function Register(){
const HandleSubmit=(e)=>{
        e.preventDefault();
        alert("Form");
    }

const HandleChange=(e)=>{
    e.preventDefault();
}    
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
    <input type="email"
     placeholder="Email" 
     name="email" 
     onChange={(e)=>HandleChange(e)}
    >
    </input>
    <input type="password"
     placeholder="Password" 
     name="password" 
     onChange={(e)=>HandleChange(e)}
    >
    </input>
    <input type="password"
     placeholder="Confirm Password" 
     name="confirmPassword" 
     onChange={(e)=>HandleChange(e)}
    >
    </input>
    <button type="submit">Create User</button>
    <span>Already have an Account? <Link to="/login">Login</Link></span>
    </form>

  </FormContainer>
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
           &:focus{
            border:0.1rem solid #997af0;
            outline:none;
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
                color:#A61C3C;
                font-weight:bold;
                text-decoration:none;
            }
        }


    }

}`
export default Register;
