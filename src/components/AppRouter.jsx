import React from 'react';
import {Route, Routes} from "react-router";
import Chat from "../pages/Chat";
import Room from "./chat/Room";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/profile/chat" element={<Chat/>} key="/profile/chat">
                <Route path=":id" element={<Room/>} key=":id"/>
            </Route>
        </Routes>
    );
};

export default AppRouter;