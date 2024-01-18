import react ,{useState, useEffect} from "react";
import styled from "styled-components";
import Logo from "../Assets/Chatappimage.jpg";

const Contact=({contacts, currentUser, changeChat})=>{
    const [currentUserName, setCurrentUserName]= useState(undefined);
    const [currentUserImage, setCurrentUserImage]= useState(undefined);
    const [currentSelected, setCurrentSelected]= useState(undefined);
    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username)
        }
    },[currentUser]);
const ChangeCurrentChat=(index, contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
}
return<>{
        currentUserName && currentUserImage && (
        <Container>
            <div className="brandname">
                <img src={Logo} alt="Logo" />
                <h3>ChatApp</h3>
            </div>
            <div className="contacts">
                {
                  contacts.map((contact, index)=>{
                    return <div className={`contact ${index===currentSelected? "selected": ""}`} key={index }
                     onClick={()=>ChangeCurrentChat(index,contact)}>
                        <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="Avatar" />
                        </div>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                  })  
                }
            </div>
            <div className="currentUser">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="Avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUser.username}</h2>
                        </div>
            </div>

        </Container>)
    }
    </>

}
const Container= styled.div`
display:grid;
grid-template-rows: 10% 75% 15%;
overflow:hidden;
background-color: #080420;
.brandname{
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
        height: 2rem; 
        border-radius: 0.2rem;
    }
    h3{
        color: white;
    }
}
.contacts{
    display:flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem
            border-radius: 1rem;
        }
    }
    gap: 0.8rem;

    .contact{
        display:flex;
        background-color: #ffffff39;
        min-height: 5rem;
        width:90%;
        cursor:pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        align-items: center;
        gap: 1rem;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color:white;
            }
        }
    }
    .selected{
        background-color: #9186f3;
    }
}
.currentUser{
    background-color: #0d0d30;
    display:flex;
    justify-content: center;
    align-items: center;
    gap:2rem;
    .avatar{
        img{
            height:4rem;
            max-inline-size:100%;

        }
    }
    .username{
        h2{
            color:white;    
        }
    }
    @media screen and (min-width:720px) and (max-width:1080px){
        .username{
            h2{
                font-size: 1rem;

            }
        }
      }
}
`
export {Contact};