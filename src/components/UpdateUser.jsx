import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { url } from "../App";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/reducres/userReducer";

export default function Reset({ isUpdate, setisUpdate, userName, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const uploadToClient = async (e) => {
    const loading = toast.loading("Uploading to server");
    const i = e.target.files[0];
    setImageUrl(URL.createObjectURL(i));
    const data = new FormData();
    data.append("file", i);
    data.append("upload_preset", "n5y4fqsf");
    data.append("cloud_name", "ddfdfdfd");
    try {
      const { data: i } = await axios.post(
        "https://api.cloudinary.com/v1_1/ddfdfdfd/image/upload",
        data
      );
      toast.dismiss(loading);
      toast.success("Uploaded to server successfully ", { duration: 1000 });
      setImage(i.url);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async (e) => {
    const loading = toast.loading("Updating user");
    e.preventDefault();
    if (name === "" || imageUrl === "" || image === "") {
      toast.dismiss(loading);
      toast.error("Please fill all the fields", { duration: 1500 });
    } else {
      try {
        await axios.put(`${url}/user/update?name=${name}&id=${id}`, {
          profileImage: image,
        });
        toast.dismiss(loading);
        toast.success("Updated successfully successfully", { duration: 1000 });
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
      <Transition appear show={isUpdate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setisUpdate(false)}>
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
                    Update User
                  </Dialog.Title>
                  <form
                    className="flex flex-col gap-3 my-3"
                    onSubmit={updateUser}>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        className="w-24 h-24 mx-auto object-cover rounded-3xl my-2"
                      />
                    )}
                    <input
                      type="file"
                      className="text-base font-semibold py-1 px-2 border-none rounded-md outline-none text-black"
                      onChange={(e) => uploadToClient(e)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="text-base font-semibold py-1 px-2 border-none rounded-md outline-none text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="text-lg font-semibold py-1 px-3 rounded-md mx-auto bg-gradient-to-r from-indigo-500  to-cyan-500 w-fit"
                      type="submit">
                      Update
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
