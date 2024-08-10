import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const registerNumber = () => {
  const [formdata, setformdata] = useState({
    number: "",
  });
  const [phone, setphone] = useState("+91");
  //   const [Numbers, setNumber] = useState("");
  const SendData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "messageNumbers"), {
        Number: formdata.number,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Number registered");
    } catch (error) {
      console.log(error);
      toast.error("Currently We are down");
    }
  };
  return (
    <Layout>
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
      <div className="flex justify-center items-center">
        <form
          className="w-[30%] pt-40 flex flex-col justify-center"
          onSubmit={SendData}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Mobile Number
              </label>
            </div>
            <div className="md:w-2/3">
              <PhoneInput
                searchStyle={{
                  color: "black",
                  padding: "8px 12px",
                  fontWeight: "bold",
                }}
                dropdownStyle={{ color: "black" }}
                value={phone}
                country={"eg"}
                enableSearch={true}
                countryCodeEditable={false}
                onChange={(phone) =>
                  setformdata({ ...formdata, number: phone })
                }
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button
                className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default registerNumber;
