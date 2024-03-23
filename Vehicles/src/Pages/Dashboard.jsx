import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Dashboard() {
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    setImages(Array.from(e.target.files));
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });

      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Successfully Uploaded");
      console.log(response.data);
      setImages([])
      setTimeout(() => window.location.reload(), 5000)
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="w-screen max-w-md px-2 mx-auto mt-6">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Upload Multiple Images
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <fieldset>
            <input
              type="file"
              id="images"
              accept=".jpg, .png, .jpeg"
              multiple
              required
              onChange={onChange}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded transition duration-159 ease-in-out mb-2 focus:bg-white focus:border-slate-600"
            />
          </fieldset>
        </div>
        <button
          type="submit"
          className="w-full text-white uppercase font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 active bg-blue-800"
        >
          Upload
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </main>
  );
}

export default Dashboard;
