import { lazy,ComponentType } from "react";
import {RoutePath} from "./RoutePath";
import path from "path";

const Feed = lazy(() => import ("../pages/Feed/Feed")) ;
const Home = lazy(() => import ("../pages/Home/Home")) ;
const NotFound = lazy(() => import ("../pages/NotFound/NotFound")) ;
const Profile = lazy(() => import ("../pages/Profile/Profile")) ;
const Setting = lazy(() => import ("../pages/Setting/Setting")) ; 
const Login = lazy(() => import ("../pages/Login/Login")) ;

export type LayoutType = 'main' | 'auth' | null;

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  isPrivate: boolean;
  layout: LayoutType;
  title?: string;
}


export const RouteConfig: RouteConfig[] =[
    {
        path:RoutePath.HOME,
        component:Home,
        isPrivate:true,
        layout:'main',
        title:'Home'
    },
    {
        path:RoutePath.LOGIN,
        component:Login,
        isPrivate:false,
        layout:'auth',
        title:'Login'
    },
    // {
    //     path:RoutePath.FEED,
    //     component:Feed,
    //     isPrivate:true,
    //     layout:'main',
    //     title:'Feed'
    // },
    {
        path:RoutePath.PROFILE,
        component:Profile,
        isPrivate:true,
        layout:'main',
        title:'Profile'
    },
    { path:RoutePath.SETTINGS,
        component:Setting,
        isPrivate:true,
        layout:'main',
        title:'Settings'
    },
    {
        path:RoutePath.NOT_FOUND,
        component:NotFound,
        isPrivate:false,
        layout:null,
        title:'Not Found'
    }
]