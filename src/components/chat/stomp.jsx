import React, {useRef} from 'react';
import SockJsClient2 from "./StompClient";

const Stomp = () => {
    const chat = useRef();
    const sendMessage = (msg) => {
        chat.sendMessage('/topics/all', msg);
    }
    return (
        <div>
            <SockJsClient2 url='http://localhost:3000/chat/123/ws' topics={['/topics/all']}
                          onMessage={(msg) => { console.log(msg); }}
                          ref={ chat } />
        </div>
    );
};

export default Stomp;