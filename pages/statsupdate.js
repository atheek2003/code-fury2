import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/helpform.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const StatsUpdate = () => {
  // const history = useHistory();
  const router = useRouter();
  const [formdata, setformdata] = useState({
    Injured: 0,
    Evacuated: 0,
    Deaths: 0,
    Timestamp: new Date().toLocaleTimeString("en-US"),
  });

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "stats"), formdata);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Stats Updated");
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
      <div
        className={styles.forms}
        style={{ height: "100vh", marginTop: "80px" }}
      >
        <div className={styles.form}>
          <div className={styles.title}>Update Stats</div>
          <div className={styles.subtitle}>
            Let us know whats the current senerio?
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Injured: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="number"
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              Injured
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Evacuated: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="number"
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              Evacuated
            </label>
          </div>
          <div className={`${styles.inputcontainer} ${styles.ic1}`}>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Deaths: e.target.value })
              }
              id="firstname"
              className={styles.input}
              type="number"
              placeholder=""
              required
            />
            <div className={styles.cut}></div>
            <label for="firstname" className={styles.placeholder}>
              Deaths
            </label>
          </div>
          <div className={styles.ic1}>
            <p className="text-indigo-400 font-semibold cursor-pointer">
              Note : If there is any discripency kindly{" "}
              <a
                href="mailto:hello@astrum.com"
                target={"_blank"}
                className="text-indigo-900"
              >
                mail us
              </a>
            </p>
          </div>
          <button type="text" className={styles.submit} onClick={sendData}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default StatsUpdate;
