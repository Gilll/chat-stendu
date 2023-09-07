import React, {useState} from 'react';
import ReactDom from "react-dom";
import { TalkBox } from "react-talk";

const Test = () => {
    const [messages, setMessages] = useState([
        {
            "author": "Ponger",
            "authorId": "pong",
            "message": "How you doin'!",
            "timestamp": Date.now().toString()
        }
    ])

    const onMessageReceive = (msg) => {
        setMessages([...messages, msg]);
    }

    const sendMessage = (msg, selfMsg) => {
        // selfMsg is the message object constructed from the message typed by the current user
        // NOTE: selfMsg doesn't include timestamp and needs to be added by the user of the module
        // in client or server side as required
        selfMsg["timestamp"] = Date.now().toString();
        setMessages([...messages, msg]);
        // If message sending failed return false otherwise return true
        try {
            // Insert code to send the message below
            return true;
        } catch (e) {
            return false;
        }
    }
    return (
        <TalkBox topic="react-websocket-template" currentUserId="ping" currentUser="Pinger"
                 messages={ messages } onSendMessage={ sendMessage } />
    );
};

export default Test;