import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { url } from "../App";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/reducres/userReducer";

export default function Reset({ isReset, setIsReset, userName }) {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const resetPassword = async (e) => {
    const loading = toast.loading("Reseting password");
    e.preventDefault();
    if (oldPassword === "" || newPassword === "") {
      toast.dismiss(loading);
      toast.error("Please fill all the fields", { duration: 1500 });
    } else {
      try {
        await axios.put(`${url}/user/updatePassword`, {
          newPassword,
          oldPassword,
          userName,
        });
        toast.dismiss(loading);
        toast.success("Password reset successfully", { duration: 1000 });
        setTimeout(() => {
          dispatch(logOutUser());
        }, 1000);
      } catch (error) {
        toast.dismiss(loading);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "19px",
            fontWeight: "600",
          },
        }}
      />
      <Transition appear show={isReset} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsReset(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full my-4 items-center justify-center px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6">
                    Reset Password
                  </Dialog.Title>
                  <form
                    className="flex flex-col gap-3 my-3"
                    onSubmit={resetPassword}>
                    <input
                      type="text"
                      placeholder="Enter your oldPassword"
                      className="text-base font-semibold py-1 px-2 border-none rounded-md outline-none text-black"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your newPassword"
                      className="text-base font-semibold py-1 px-2 border-none rounded-md outline-none text-black"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      className="text-lg font-semibold py-1 px-3 rounded-md mx-auto bg-gradient-to-r from-indigo-500  to-cyan-500 w-fit"
                      type="submit">
                      Reset
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
