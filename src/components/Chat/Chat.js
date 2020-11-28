import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';


let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    const ENDPOINT = 'https://anabizchat.herokuapp.com/'
    const connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
        "transports" : ["websocket"]
    };

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, connectionOptions);

        //socket.emit('join', { name, room }, () => { });
        setName(name);
        setRoom(room);
        //setRoom(socket);
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }

        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });
    }, [ENDPOINT, location.search]);



    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages]);


    const sendMessage = (event) =>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={ sendMessage } />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;