import React, { useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";

function SignUp({ setIsLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const createUser = async (e) => {
    const loading = toast.loading("Creating Account");
    e.preventDefault();
    if (userName === "" || password === "" || email === "") {
      toast.dismiss(loading);
      toast.error("Please fill all the fields", { duration: 1300 });
      return;
    }
    try {
      const { data } = await axios.post(`${url}/user/create`, {
        email,
        password,
        userName,
      });
      toast.success(data.message, { duration: 500 });
      toast.dismiss(loading);
      setIsLogin(true);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      onSubmit={createUser}
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
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
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
        className="bg-violet-600 hover:bg-violet-500 transition duration-500 cursor-pointer rounded-md font-semibold py-1 px-4">
        Create
      </button>
      <p className="font-semibold">
        Already have an account then{" "}
        <span
          className="text-lg font-bold text-yellow-300 underline cursor-pointer"
          onClick={() => setIsLogin(true)}>
          SignIn
        </span>
      </p>
    </form>
  );
}

export default SignUp;
