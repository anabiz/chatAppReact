import React from 'react';

import './Message.css';
import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
    let isSentByCurrentUser = false;
console.log(name, "tttttttt")
    const trimmedName = name.trim().toLowerCase();
    let { text , user } = message;
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }


    return (
        isSentByCurrentUser
            ?
            (
                <div style={{display:"flex", textAlign:"end"}} className="messageContainer justifyEnd">
                   
                    <div style={{border:"1px solid blue", margin:"3px 3px 5px 2px", borderRadius:"15px"}} className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p style={{backgroundColor:"blue"}} className="sentText pr-10">{trimmedName}</p>
                </div>
            ) : (
                <div  style={{display:"flex", textAlign:"left"}} className="messageContainer justifyStart">
                    <div style={{border:"1px solid blue", margin:"3px 3px 5px 2px", borderRadius:"15px"}} className="messageBox backgroundLight">
                        <p className="messageText colorDark">{text}</p>
                    </div>
                    <p style={{backgroundColor:"lightgray"}} className="sentText pl-10">{user}</p>
                </div>
            )
    )
}

export default Message;