import React, {useState, useEffect, useRef}from "react";
import {useNavigate} from "react-router-dom";
import { allUsersRoute, host} from "../Utilities/APIRoutes";
import { Contact } from "../Components/Contact";
import styled from "styled-components";
import axios from "axios";
import { Welcome } from "../Components/Welcome";
import { ChatContainer } from "../Components/ChatContainer";
import {io} from "socket.io-client";



const Chat=()=>{
  const socket=useRef();
  const Navigate= useNavigate();
  const [contacts, setContacts]= useState([]);
  const [currentUser, setCurrentUser]= useState(undefined);
  const [currentChat, setCurrentChat]=useState(undefined);
  const [userLoaded, setUserLoaded]= useState(false);
  useEffect(()=>{
    const checkUser= async ()=>{
      if(!localStorage.getItem("Chat-App_User")){
        Navigate("/login");
      }else{
        const localStorageuser=await JSON.parse(localStorage.getItem("Chat-App_User"))
        setCurrentUser(localStorageuser);
        setUserLoaded(true);
      }
    }
    checkUser();
   
  },[]);

  useEffect(()=>{
    if (currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser._id)
    }

  },[currentUser])
  useEffect(()=>{

  const ctUser=async ()=>{
    if(currentUser){
      
      if(currentUser.isAvatarImageSet){
      const data= await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data);
      }else{
        Navigate("/setAvatar");
      }
    }
  }
  ctUser();

  },[currentUser]);

  const HandleChatChange=(chat)=>{
    setCurrentChat(chat);
  }
return<Container>
        <div className="container">
          <Contact contacts={contacts} currentUser={currentUser} changeChat={HandleChatChange}></Contact>
          {(userLoaded && currentChat===undefined) ? (<Welcome currentUser={currentUser}/>) :
        (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />)}
        </div>
        
      </Container>
      
}
const  Container= styled.div`
height: 100vh;
width:100vw;
display:flex;
flex-direction: column;
justify-content:center;
gap: 1rem;
align-items: center;
background-color:#131324;
.container{
  height:85vh;
  width:85vw;
  background-color: #00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
}`

export{Chat};