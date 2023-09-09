import { lazy } from "react";
const Auth = lazy(() => import("./Auth"));
import Home from "./Home";
const Setting = lazy(() => import("./Setting"));
const UploadBlog = lazy(() => import("./UploadBlog"));
const SinglePost = lazy(() => import("./SinglePost"));
const Search = lazy(() => import("./Search"));
const Profile = lazy(() => import("./Profile"));

export { Auth, Home, Setting, UploadBlog, SinglePost, Search, Profile };
