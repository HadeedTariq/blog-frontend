import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../store/reducres/userReducer";
import { url } from "../App";

function SignIn({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    const loading = toast.loading("Signing in");
    e.preventDefault();
    if (userName === "" || password === "") {
      toast.dismiss(loading);
      toast.error("Please fill all the fields", { duration: 1300 });
      return;
    }
    const user = {
      userName,
      password,
    };
    try {
      const { data } = await axios.post(`${url}/user/login`, user);
      localStorage.setItem("blog-user-token", JSON.stringify(data.token));
      const { data: userData } = await axios.post(`${url}/user`, {
        token: data.token,
      });
      dispatch(authUser(userData));
      toast.success(data.message, { duration: 1500 });
      toast.dismiss(loading);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={loginUser}
      className="bg-gradient-to-r rounded-md from-cyan-500 to-violet-500 h-fit my-64 py-3 px-5 w-96 flex flex-col gap-2 items-center">
      <input
        className="text-lg border-green-300 outline-none py-0.5 px-2 w-full  text-black rounded-md border"
        type="text"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        className="text-lg border-green-300 outline-none py-0.5 px-2 w-full  text-black rounded-md border"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-500 transition duration-500 rounded-md font-semibold py-1 px-4">
        SignIn
      </button>
      <p className="font-semibold">
        Dont have account then{" "}
        <span
          className="text-lg font-bold text-orange-400 underline cursor-pointer"
          onClick={() => setIsLogin(false)}>
          Create
        </span>
      </p>
    </form>
  );
}

export default SignIn;
