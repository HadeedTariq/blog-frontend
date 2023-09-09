import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SignIn, SignUp } from "../components";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex w-full justify-center h-screen">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "19px",
            fontWeight: "600",
          },
        }}
      />
      {isLogin && <SignIn setIsLogin={setIsLogin} />}
      {!isLogin && <SignUp setIsLogin={setIsLogin} />}
    </div>
  );
}

export default Auth;
