import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {BiPowerOff} from "react-icons/bi"

const Logout=()=>{
    const Navigate= useNavigate();
    const HandleClick= async ()=>{
        localStorage.clear();
        Navigate("/login");
    }
    return<Button onClick={HandleClick}>
            <BiPowerOff/>
          </Button>
       
}
const Button = styled.button`
display:flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
border: none;
background-color: #9a86f3;
cursor: pointer;
svg{
    font-size: 1.3rem;
    color: #ebe7ff;
}
`;

export {Logout};