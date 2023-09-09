import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment } from "react";
import { Toaster, toast } from "react-hot-toast";
import { url } from "../App";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/reducres/userReducer";

export default function Delete({ isDelete, setIsDelete, id, userName }) {
  const dispatch = useDispatch();
  const DeletePassword = async (e) => {
    const loading = toast.loading("Deleting Account");
    e.preventDefault();
    try {
      await axios.delete(`${url}/user/delete?id=${id}&&userName=${userName}`);
      toast.success("Account deleted successfully", { duration: 1000 });
      setTimeout(() => {
        toast.dismiss(loading);
        dispatch(logOutUser());
      }, 1000);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response.data.message);
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
      <Transition appear show={isDelete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDelete(false)}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6">
                    Do you want to delete your account ?
                  </Dialog.Title>
                  <form
                    className="flex justify-end gap-3 my-3"
                    onSubmit={DeletePassword}>
                    <button
                      className="text-lg font-semibold  px-3 rounded-md  bg-red-500 w-fit"
                      type="submit">
                      Yes
                    </button>
                    <button
                      className="text-lg font-semibold  px-3 rounded-md  bg-black w-fit"
                      onClick={() => setIsDelete(false)}>
                      No
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
