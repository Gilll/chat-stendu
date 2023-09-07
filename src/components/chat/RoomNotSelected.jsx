import React from 'react';
import {Empty} from "antd";

const RoomNotSelected = () => {
    return (
        <div className="chat-room">
            <div className="chat-room__container">
                <div className="left-red-Line">
                    <div className="lh-less">Сhoose a room</div>
                </div>
                <Empty />
            </div>
        </div>
    );
};

export default RoomNotSelected;