import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Logo from "../Assets/Chatappimage.jpg"

const Welcome=({currentUser})=>{
    return<Container>
        <img src={Logo} alt="Robot" />
        <h1>Welcome, <span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start messaging</h3>
        </Container>
}

const Container= styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
color:white;
gap: 1.5rem;
img{
    height: 18rem;
}
span{
    color:#4e00ef;
}
`;

export{Welcome};