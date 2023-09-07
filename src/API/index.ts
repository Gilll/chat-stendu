import * as React from "react";
import Login from '../pages/Login'
import Intro from '../pages/Intro'
import Calc from '../pages/Calc'
import Requests from '../pages/Requests'
import Learning from '../pages/Learning'
import Services from '../pages/Services'
import Registration from "../pages/Registration";
import Chat from "../pages/Chat";
import Page404 from "../pages/page-404";
import Room from "../components/chat/Room";
import Profile from "../pages/Profile";
import Requisites from "../components/profile/Requisites";
import ReferProgramm from "../components/profile/ReferProgramm";
import ProfileSettings from "../components/profile/ProfileSettings";
import Balance from "../components/profile/Balance";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact?: boolean;
    sub?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    INTRO = '/intro',
    PROFILE = '/profile',
    BALANCE = '/profile/balance',
    REQUISITES = '/profile/requisites',
    REFERPROGRAMM = '/profile/refer_programm',
    PROFILE_SETTING = '/profile/settings',
    CALC = '/calc',
    REQUESTS = '/requests',
    LEARNING = '/learning',
    SERVICES = '/services',
    HOME = '/',
    REGISTRATION = '/registration',
    FORGOT_PASS = '/forgot-password',
    CHAT = '/chat',
    CHATSUB = ':id',
    NOT_FOUND = '*'
}

export enum RouteProfile {
    BALANCE = 'balance',
    REQUISITES = 'requisites',
    REFERPROGRAMM = 'refer_programm',
    PROFILE_SETTING = 'settings',
}

export const authRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login, exact: true },
    { path: RouteNames.REGISTRATION, element: Registration, exact: true }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.INTRO, element: Intro, exact: true },
    { path: RouteNames.HOME, element: Intro, exact: true },
    { path: RouteNames.CALC, element: Calc, exact: true },
    { path: RouteNames.REQUESTS, element: Requests, exact: true },
    { path: RouteNames.LEARNING, element: Learning, exact: true },
    { path: RouteNames.SERVICES, element: Services, exact: true },
    { path: RouteNames.CHAT, element: Chat, exact: true, sub: true },
    { path: RouteNames.CHATSUB, element: Room, exact: true },
    { path: RouteNames.NOT_FOUND, element: Page404, exact: true },
    { path: RouteNames.PROFILE, element: Profile, exact: true, sub: true }
]

export const profileRoutes: IRoute[] = [
    { path: RouteProfile.BALANCE, element: Balance, exact: true },
    { path: RouteProfile.REQUISITES, element: Requisites, exact: true },
    { path: RouteProfile.REFERPROGRAMM, element: ReferProgramm, exact: true },
    { path: RouteProfile.PROFILE_SETTING, element: ProfileSettings, exact: true },
]