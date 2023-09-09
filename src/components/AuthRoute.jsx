import axios from "axios";
import { useEffect } from "react";
import { url } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/reducres/userReducer";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const { logInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("blog-user-token"));
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(`${url}/user`, { token });
        dispatch(authUser(data));
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);
  if (!logInUser) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default AuthRoute;
