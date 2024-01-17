import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Logout } from "./Logout";
const ChatContainer=({currentChat})=>{
console.log(currentChat);
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

        <div className="chat-messages"></div>
        <div className="chat-input"></div>
    </Container>)
    }
   </>
}
const Container= styled.div`
padding-top: 1rem;
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
}`;

export {ChatContainer};