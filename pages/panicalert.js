import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { db } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { collection, doc, getDocs } from "firebase/firestore";

const panicalert = () => {
  const [formdata, setformdata] = useState({
    number: "",
    text: "",
  });
  const [phone, setphone] = useState("+91");

  async function sendData(e) {
    e.preventDefault();
    console.log(formdata);
    try {
      const res = await axios.post("https://code-fury-backend.vercel.app/", {
        num: formdata.number,
        text: formdata.text,
      });
      setformdata({ number: "", text: "" });
      console.log(res.status);
    } catch (error) {
      console.log(error, error.message);
    }
  }
  async function checksendData(e) {
    e.preventDefault();
    try {
      const querySnapshot = await getDocs(collection(db, "messageNumbers"));
      querySnapshot.forEach(async (doc) => {
        const res = await axios.post("https://twilio-backend.onrender.com", {
          num: doc.data().Number,
          text: formdata.text,
        });
        console.log(res.status);
        if (res.status === 200) {
          toast.success("Critical Info Broadcasted");
        }
        console.log(doc.data());
      });
    } catch (error) {
      console.log(error, error.message);
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="flex justify-center">
        <form className="w-full max-w-sm mt-40" onSubmit={checksendData}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Text
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white py-4 appearance-none border-2 border-gray-200 rounded w-[120%] px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="text"
                placeholder="Male"
                onChange={(e) =>
                  setformdata({ ...formdata, text: e.target.value })
                }
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6"></div>
          <div className="md:flex md:items-center md:justify-center">
            <div className="flex justify-center">
              <button
                className="shadow w-40 bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default panicalert;
