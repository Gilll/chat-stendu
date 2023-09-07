import React from 'react';

const UserMessage = ({message}) => {
    const uid = parseInt(localStorage.getItem('userID'));

    return (
        <>
            {message.sender !== undefined && (message.sender.userId === uid ?
                <div className="user-message user-message--self">
                    <div className="user-message__text-wrapper">
                        <div className="user-message__text">
                            <div className="user-message__status">
                                <span className="user-message__user-name">Вы</span>
                                <span className="user-message__date">{new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}</span>
                            </div>
                            <div>{message.content}</div>
                        </div>
                    </div>
                </div>
                :
                <div className="user-message user-message--companion">
                    <div className="user-message__row">
                        <div className="user-message__text-wrapper">
                            <div className="user-message__text">
                                <div className="user-message__status">
                                    <span className="user-message__user-name">{ message.sender.firstName } { message.sender.lastName }</span>
                                    <span className="user-message__date">{new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}</span>
                                </div>
                                <div>{message.content}</div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default UserMessage;