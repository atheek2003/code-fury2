import React, { useState, useEffect } from "react";
import styles from "../styles/helpform.module.css";
import Header from "../components/Layout/Header";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const AlertCreate = () => {
  // const history = useHistory();
  const router = useRouter();
  const [long, setlong] = useState("");
  const [lati, setlati] = useState("");
  const [formdata, setformdata] = useState({
    title: "",
    desc: "",
    longi: "",
    latitude: "",
    type: "",
    city: "",
    Timestamp: new Date().toLocaleTimeString("en-US"),
    date: new Date().toLocaleDateString("en-US"),
  });

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Error");
    }
  }

  function showPosition(position) {
    // console.log( position.coords.latitude);
    setlati(position.coords.latitude);
    setlong(position.coords.longitude);
    setformdata({
      ...formdata,
      latitude: position.coords.latitude,
      longi: position.coords.longitude,
    });
    console.log(formdata);
  }

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "alerts"), formdata);
      console.log("Document written with ID: ", docRef.id);
      if (formdata.type.toLocaleLowerCase() !== "alert")
        toast.success("Relief Created");
      else toast.error("Alert Created");
    } catch (error) {
      toast.error("Stats Can't Update");
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        router.push("/");
        // ...
      }
    });
  }, []);

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
      <Header />
      {/* <div className='bg-back' style={{ padding: "60px" }}>

            </div> */}
      <div className={styles.forms} style={{ marginTop: "20vh" }}>
        <form onSubmit={sendData} className={`${styles.form} my-10`}>
          <div className={styles.title}>Create Bulliten</div>
          <div className={styles.subtitle}>
            Let everyone know whats you are doing?
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, title: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="text"
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              Title
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <textarea
              onChange={(e) =>
                setformdata({ ...formdata, desc: e.target.value })
              }
              id="firstname"
              className={styles.input}
              style={{ padding: "14px" }}
              type="text"
              placeholder=""
              rows={3}
              cols={3}
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              Description
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.outlinenone}`}>
            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-black-900 "
            >
              Select an option
            </label>
            <select
              id="countries"
              className="text-black border-none text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              style={{ background: "#e8e8e8" }}
              onChange={(e) =>
                setformdata({ ...formdata, type: e.target.value })
              }
            >
              <option selected>Choose a type</option>
              <option value="alert" className="text-base font-semibold">
                Alert
              </option>
              <option value="info" className="text-base font-semibold">
                Info
              </option>
              <option value="relief" className="text-base font-semibold mx-2">
                Relief
              </option>
            </select>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, city: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="text"
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              city
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, longi: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="text"
              value={long}
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              longitude
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, latitude: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="text"
              value={lati}
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              latitude
            </label>
          </div>
          <button
            onClick={getLocation}
            className="btn-sm mr-3 mt-3 bg-yell font-semibold text-back hover:text-gray-900 px-5 flex items-center transition duration-150 ease-in-out"
          >
            Locate City
          </button>
          {/* <div className={styles.ic1}>
						<p className="text-red-600 font-semibold cursor-pointer">
							Note : If there is any discripency kindly{" "}
							<a
								href="mailto:hello@astrum.com"
								target={"_blank"}
								className="text-blue-600"
							>
								mail us
							</a>
						</p>
					</div> */}
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AlertCreate;
