import React, { useState } from "react";
import axios from "axios";



function Dashboard() {
  const [formData, setFormData] = useState({
    images: [],
  });

  const onChange = (e) => {
    setFormData({ images: e.target.files });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // console.log(formData);

      const formVal = new FormData();
      // Object.values(formData.images).forEach((image) => {
      //     // console.log(image);
      //     formVal.append('file', image);
      // });
      Object.values(formData.images).forEach((image, index) => {
        formVal.append('file', image);
      });

      console.log("formVal:");
      for (let [key, value] of formVal.entries()) {
        console.log(key, value);
      }

      console.log("formVal " + typeof formVal);
      const response = await axios.post(
        "http://localhost:8000/api/upload/",

        formVal,
        {
          headers: {
            // Accept: "application/json",
            "Content-Type": "multipart/form-data",
            //   "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen max-w-md px-2 mx-auto mt-6">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Give Images to detect
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
          Submit
        </button>
      </form>
    </main>
  );
}

export default Dashboard;
