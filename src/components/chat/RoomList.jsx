import React from 'react';
import {NavLink} from "react-router-dom";

const RoomList = ({rooms}) => {
    return (
        <>
            {rooms.map((room, index) =>
                <NavLink to={"/profile/chat/" + room.dialogId} className="room-list__item" key={index}>
                    <div className="room-list__item-wrapper">
                        <div className="room-list__icon">
                            <img src={room.image} alt=''/>
                        </div>
                        {room.unreadMessages !== 0 && <div className="room-list__unread">{room.unreadMessages}</div> }
                        <div className="room-list__info">
                            <div className="room-list__name">{room.name}</div>
                            <div className="room-list__last-mess">{room.content}</div>
                        </div>
                        <div className="room-list__date">{new Date(room.timestamp).getHours()}:{new Date(room.timestamp).getMinutes()}</div>
                    </div>
                    <div className="room-list__item-text">3-к. квартира, 80,6 м², 8/20 эт.   19 827 600₽</div>
                </NavLink>
            )}
        </>
    );
};

export default RoomList;