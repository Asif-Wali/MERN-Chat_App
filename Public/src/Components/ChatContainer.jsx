import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { Logout } from "./Logout";
import { ChatInput } from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../Utilities/APIRoutes";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
const ChatContainer=({currentChat,currentUser, socket})=>{
    const [arrivalMessage, setArrivalMessage]=useState(null);
    const [Messages, setMessages]=useState([]);
    const scrollRef= useRef();



useEffect(()=>{
    async function getMessagesfromDatabase(){
        const response=await axios.post(getAllMessagesRoute,{
            from: currentUser._id,
            to: currentChat._id
        });
        setMessages(response.data);
    };

    if(currentChat){
        getMessagesfromDatabase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  
},[currentChat,currentUser._id])

const HandleSendMsg= async(msg)=>{
    await axios.post(sendMessageRoute,{
        from: currentUser._id,
        to:currentChat._id,
        message: msg
    });
    socket.current.emit("send-msg",{
        to: currentChat._id,
        from:currentUser._id,
        message: msg
    });
    const msgs=[...Messages];
    msgs.push({fromSelf:true, message : msg })
    setMessages(msgs);

}

useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-received",(msg)=>{
            console.log(msg)
            setArrivalMessage({fromSelf:false, message: msg})
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

useEffect(()=>{
    arrivalMessage && setMessages((prev)=> [...prev, arrivalMessage])

},[arrivalMessage]);
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
},[Messages]);


    return<>
    {
    currentChat && (<Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="ChatImage" />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout/>
        </div>
        <div className="chat-messages">
            {Messages.map((message,index)=>{
                return<div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf?"sended":"received"}`}>
                    <div className="content">
                        <p>{message.message}</p>
                    </div>
                    </div>
                </div>
            })
            }
        </div>
        <ChatInput HandleSendMsg={HandleSendMsg}/>
    </Container>)
    }
   </>
}
const Container= styled.div`
padding-top: 1rem;
display:grid;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow: hidden;
@media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 15% 70% 15%;
  }
.chat-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    .user-details{
        display:flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height:3rem;
            }
        }
        .username{
            h3{
                color: white;
            }
        }
    }
}
.chat-messages{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap: 1rem;
    overflow:auto;
    .message{
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap: break-word;
            padding:1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1;

        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #4f04ff21;

        }
    }
    .received{
        justify-content:flex-start;
        .content{
            background-color:#9900ff20;
        }
    }
}`;

export {ChatContainer};