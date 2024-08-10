import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { db } from "../firebase/firebase";
//INTERNAL IMPORT
import styles from "../styles/pop.module.css";
import { collection, addDoc } from "firebase/firestore";

const Pop = ({ title, text, setVisible }) => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Error");
    }
  }

  function showPosition(position) {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=2f64534e3dbf426898582dd1b1f5f64f`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results[0].formatted);
        const docRef = addDoc(collection(db, "EmergencyReq"), {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          Timestamp: new Date().toLocaleTimeString("en-US"),
          FullAddress: result.results[0].formatted,
        })
          .then(() => {
            toast.success("Emergency Request Accepted");
            setVisible(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div className={styles.Model}>
      <div className={styles.Model_box} style={{ width: "40rem" }}>
        <div className={styles.Model_box_heading}>
          <p
            style={{
              fontWeight: 600,
              fontSize: "24px",
              textAlign: "center",
            }}
            className="text-red-500"
          >
            {title}
          </p>
          <div
            className={styles.Model_box_heading_img}
            onClick={() => setVisible(false)}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineCloseSquare color="" className="text-red-500" size={50} />
          </div>
        </div>

        <div
          className={styles.Model_box_wallet}
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="text-red-500 text-base">{text}</div>
          <div className="mt-10">
            <button
              onClick={getLocation}
              class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pop;
