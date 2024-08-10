import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout/Layout";

const Helpform = () => {
  const [loc, setloc] = useState("");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Error");
    }
  }

  const [formdata, setformdata] = useState({
    Name: "",
    Gender: "",
    Phone: "",
    Email: "",
    long: "",
    lat: "",
    Place: "",
    toh: "",
    Evacuated: false,
    FullAddress: "",
    Timestamp: new Date().toLocaleTimeString("en-US"),
  });
  function showPosition(position) {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=2f64534e3dbf426898582dd1b1f5f64f`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results[0].formatted);
        setformdata({
          ...formdata,
          FullAddress: result.results[0].formatted,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setloc(result.results[0].formatted);
      })
      .catch((error) => console.log("error", error));
  }
  const SendData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "HelpForm"), formdata);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Help registered");
    } catch (error) {
      toast.error("Currently We are down");
    }
  };
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
      <Layout>
        <div className="flex justify-center">
          <form className="w-full max-w-sm mt-40" onSubmit={SendData}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  onChange={(e) =>
                    setformdata({ ...formdata, Name: e.target.value })
                  }
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Gender
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="Male"
                  onChange={(e) =>
                    setformdata({ ...formdata, Gender: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="email"
                  onChange={(e) =>
                    setformdata({ ...formdata, Email: e.target.value })
                  }
                  placeholder="sxd@gmail.com"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Phone
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="number"
                  placeholder="9343894832"
                  onChange={(e) =>
                    setformdata({ ...formdata, Phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Help Category
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="Food"
                  onChange={(e) =>
                    setformdata({ ...formdata, toh: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Place of help
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="Male"
                  onChange={(e) =>
                    setformdata({ ...formdata, Place: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-2/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-password"
                >
                  Location
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder=""
                  defaultValue={loc}
                />
              </div>
              <div className="pl-4 md:w-max">
                <button
                  onClick={getLocation}
                  type="button"
                  className="bg-transparent hover:bg-testred text-testred font-semibold hover:text-white py-2 px-4 border border-testred hover:border-transparent rounded"
                >
                  Locate
                </button>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6"></div>
            <div className="md:flex md:items-center md:justify-center">
              <div className="flex justify-center">
                <button
                  className="shadow w-40 bg-red-500 hover:bg-testred focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Helpform;
