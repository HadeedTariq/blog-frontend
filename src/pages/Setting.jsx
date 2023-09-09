import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/reducres/userReducer";
import { useNavigate } from "react-router-dom";
import { DeleteAccount, ResetPassword, UpdateUser } from "../components";

function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    logInUser: { userName, profileImage, id },
  } = useSelector((state) => state.user);
  const logOut = async (req, res) => {
    dispatch(logOutUser());
    navigate("/auth");
  };
  const updateUser = async (req, res) => {
    setIsUpdate(true);
  };
  const deleteUser = async (req, res) => {
    setIsDelete(true);
  };
  const resetPassword = async (req, res) => {
    setIsReset(true);
  };
  return (
    <>
      {isReset && (
        <ResetPassword
          isReset={isReset}
          setIsReset={setIsReset}
          userName={userName}
        />
      )}
      {isDelete && (
        <DeleteAccount
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          id={id}
          userName={userName}
        />
      )}
      {isUpdate && (
        <UpdateUser
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          id={id}
          userName={userName}
        />
      )}
      <div className="flex flex-col p-3 gap-2">
        <div className="flex items-center gap-2">
          <img
            src={profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-base font-semibold">{userName}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center my-2">
            <p className="text-base font-semibold">Logout User</p>
            <button
              className="text-base font-semibold bg-red-500 py-0.5 px-4 rounded-md w-24"
              onClick={logOut}>
              Logout
            </button>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="text-base font-semibold">Update User</p>
            <button
              className="text-base font-semibold bg-indigo-500 py-0.5 px-4 rounded-md w-24"
              onClick={updateUser}>
              Update
            </button>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="text-base font-semibold">Reset Password</p>
            <button
              className="text-base font-semibold bg-cyan-500 py-0.5 px-4 rounded-md w-24"
              onClick={resetPassword}>
              Reset
            </button>
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="text-base font-semibold">Delete User</p>
            <button
              className="text-base font-semibold bg-pink-500 py-0.5 px-4 rounded-md w-24"
              onClick={deleteUser}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
