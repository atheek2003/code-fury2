import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { HiBellAlert } from "react-icons/hi2";
import { MdDangerous } from "react-icons/md";
import Donations from "../utils/Donations";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
// import { Link, useHistory } from "react-router-dom";
import { useRouter } from "next/router";

const dashboard = () => {
  // const history = useHistory();
  const router = useRouter();
  const [Injured, setInjured] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Evacuated, setEvacuted] = useState(0);
  const [time, settime] = useState("");
  const [data, setdata] = useState([{}]);
  const [Emerdata, setEmerdata] = useState([{}]);
  let totaldona = 0;
  function sendMail(uniq, user, email) {
    emailjs
      .send(
        "service_hesknwi",
        "template_ibzkoaw",
        {
          email: email,
          ngo: auth.currentUser?.displayName,
          user: user,
          link: `https://socket-chat.up.railway.app/chat.html?name=${user}&room=${uniq}`,
        },
        "gP8sKnDLte9gp24k2"
      )
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        window.open(
          `https://socket-chat.up.railway.app/chat.html?name=${auth.currentUser?.displayName}&room=${uniq}`,
          "_blank"
        );
        setemail("");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const GetData = async () => {
    let i = 0,
      e = 0,
      d = 0;
    const querySnapshot = await getDocs(collection(db, "stats"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      i += parseInt(doc.data().Injured);
      e += parseInt(doc.data().Evacuated);
      d += parseInt(doc.data().Deaths);
      settime(doc.data().Timestamp);
    });
    setInjured(i);
    setDeaths(d);
    setEvacuted(e);
  };
  const [loc, setloc] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Error");
    }
  }

  async function handleEvacuated(id, Ev) {
    console.log("Eva", id, Ev);
    const washingtonRef = doc(db, "HelpForm", id);
    await updateDoc(washingtonRef, {
      Evacuated: !Ev,
    });
    window.location.reload();
  }

  function showPosition(position) {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=2f64534e3dbf426898582dd1b1f5f64f`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results[0].city);
        setloc(result.results[0].city);
      })
      .catch((error) => console.log("error", error));
  }

  const GetDataHelp = async () => {
    let i = 0;
    let temp = [];
    const querySnapshot = await getDocs(collection(db, "HelpForm"));
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
      i++;
    });
    // console.log(temp);
    setdata(temp);
  };
  const GetDataEmer = async () => {
    let temp = [];
    const querySnapshot = await getDocs(collection(db, "EmergencyReq"));
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setEmerdata(temp);
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
    GetData();
    GetDataHelp();
    GetDataEmer();
    getLocation();
  }, []);

  return (
    <div>
      <div className="antialiased bg-white w-full min-h-screen text-slate-900 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-1 sm:gap-3 md:gap-4 lg:gap-7 xl:gap-10 max-w-7xl my-10 px-2">
          <div id="menu" className=" bg-resq-500 col-span-3 rounded-lg p-4 ">
            <h1
              onClick={() => auth.signOut()}
              className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent"
            >
              Dashboard<span className="text-indigo-400">.</span>
            </h1>
            <p className="text-slate-200 text-sm mb-2">Welcome back,</p>
            <a
              href="#"
              className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
            >
              <div>
                <img
                  className="rounded-full w-10 h-10 relative object-cover"
                  src={
                    auth.currentUser?.photoURL != null
                      ? auth.currentUser?.photoURL
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_F8Fkc4WqCZ018z4t2RSPmA9iTAdeEaopA&usqp=CAU"
                  }
                  alt="Timothy"
                  width="32"
                  height="32"
                />
              </div>
              <div>
                <p className="font-medium group-hover:text-indigo-400 leading-4">
                  {auth.currentUser?.displayName}
                </p>
              </div>
            </a>
            <hr className="my-2 border-slate-700" />
            <div id="menu" className="flex flex-col space-y-2 my-5">
              <a
                href="#"
                className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              >
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      color="white"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:text-indigo-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                      Dashboard
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/statsupdate"
                className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              >
                <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3 12.8294C18.5124 12.8294 19.6102 12.8983 20.2855 13.0265C20.296 13.0265 20.9139 13.1536 21.1199 13.2356C21.4172 13.3639 21.6688 13.5955 21.8291 13.8853C21.9438 14.1169 22 14.3616 22 14.617C21.9895 14.883 21.8174 15.3831 21.7367 15.5802C21.2346 16.8797 19.5868 19.3633 18.5815 20.3158C18.4211 20.4774 18.2269 20.652 18.1812 20.6983C17.9284 20.8955 17.6206 21 17.2894 21C16.991 21 16.6937 20.9074 16.4538 20.7209C16.3292 20.6318 16.1473 20.4545 16.0641 20.3715L16.0196 20.3265C14.978 19.3526 13.4121 16.926 12.9089 15.6955C12.8982 15.6955 12.6475 15.0816 12.5968 14.7113L12.5882 14.617V14.5706C12.5882 14.0361 12.8855 13.5373 13.3665 13.2819C13.6298 13.1429 14.3952 13.0147 14.4069 13.0028C15.0927 12.8983 16.1449 12.8294 17.3 12.8294ZM6.70553 12.8905C7.18478 12.8905 7.57926 13.2561 7.63317 13.7277L7.63945 13.8383L7.89575 18.4171C7.89575 19.0846 7.36325 19.625 6.70553 19.625C6.08892 19.625 5.58133 19.15 5.52029 18.5406L5.51414 18.4171L5.77161 13.8383C5.77161 13.3146 6.18942 12.8905 6.70553 12.8905ZM6.71173 3C7.00783 3 7.30509 3.09264 7.54618 3.27793C7.65004 3.35291 7.79368 3.48866 7.88681 3.57993L7.98037 3.67345C9.02079 4.64858 10.5879 7.07394 11.0911 8.30444C11.1007 8.30444 11.3523 8.91922 11.4032 9.28974L11.4118 9.38409V9.43041C11.4118 9.96371 11.1133 10.4626 10.6335 10.7179C10.3702 10.8581 9.60478 10.9852 9.59308 10.997C8.90727 11.1016 7.85514 11.1704 6.70003 11.1704C5.48757 11.1704 4.38981 11.1016 3.71453 10.9733C3.70282 10.9733 3.08606 10.8462 2.88009 10.7642C2.58282 10.6372 2.3312 10.4044 2.17087 10.1145C2.05618 9.88294 2 9.63827 2 9.38409C2.01053 9.11685 2.18257 8.618 2.26215 8.42083C2.76539 7.12026 4.41204 4.6367 5.41852 3.68532C5.57886 3.5226 5.77313 3.34801 5.81877 3.30169C6.07039 3.10452 6.37936 3 6.71173 3ZM17.2947 4.375C17.9113 4.375 18.4179 4.84999 18.4788 5.45938L18.4849 5.58295L18.2286 10.1618C18.2286 10.6856 17.8108 11.1096 17.2947 11.1096C16.8155 11.1096 16.421 10.744 16.3671 10.2724L16.3608 10.1618L16.1033 5.58295C16.1033 4.91543 16.637 4.375 17.2947 4.375Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                      Update Data
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/alertcreate"
                className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              >
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                  <div>
                    <HiBellAlert size={30} color={"white"} />
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                      Create Bulliten
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/panicalert"
                className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              >
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                  <div>
                    <MdDangerous color="white" size={30} />
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                      Critical Alert
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="https://donate.stripe.com/test_28o4gI1Dle9VdlS8ww"
                className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
              >
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                  <div>
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3541 0C23.9526 0 26.6667 2.64612 26.6667 7.17573H21.0252V7.22196C18.4069 7.22196 16.2844 9.29132 16.2844 11.844C16.2844 14.3967 18.4069 16.4661 21.0252 16.4661H26.6667V16.882C26.6667 21.3539 23.9526 24 19.3541 24H7.31259C2.71407 24 0 21.3539 0 16.882V7.11796C0 2.64612 2.71407 0 7.31259 0H19.3541ZM25.6711 9.16322C26.2209 9.16322 26.6667 9.59778 26.6667 10.1338V13.5079C26.6603 14.0414 26.2183 14.4723 25.6711 14.4786H21.1319C19.8064 14.496 18.6473 13.6112 18.3467 12.3524C18.1961 11.5711 18.4075 10.7648 18.9241 10.1496C19.4407 9.53449 20.2098 9.17343 21.0252 9.16322H25.6711ZM21.6652 10.7232H21.2267C20.9574 10.7201 20.6981 10.8222 20.5066 11.0067C20.3151 11.1912 20.2074 11.4428 20.2074 11.7053C20.2074 12.2561 20.6618 12.7043 21.2267 12.7106H21.6652C22.2281 12.7106 22.6844 12.2657 22.6844 11.7169C22.6844 11.1681 22.2281 10.7232 21.6652 10.7232ZM13.843 5.18825H6.31704C5.75871 5.18822 5.30427 5.62613 5.29778 6.17044C5.29778 6.72117 5.7522 7.1694 6.31704 7.17573H13.843C14.4059 7.17573 14.8622 6.73082 14.8622 6.18199C14.8622 5.63317 14.4059 5.18825 13.843 5.18825Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                      Donate
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <p className="text-sm text-center text-gray-600">
              © 2022 ResQmate.
            </p>
            <div
              onClick={() => auth.signOut()}
              style={{ cursor: "pointer" }}
              className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400"
            >
              <a className="nav__logout flex flex-align-center ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  color="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4927 2C13.9753 2 16 3.99 16 6.44V11.23H9.89535C9.45785 11.23 9.11192 11.57 9.11192 12C9.11192 12.42 9.45785 12.77 9.89535 12.77H16V17.55C16 20 13.9753 22 11.4724 22H6.51744C4.02471 22 2 20.01 2 17.56V6.45C2 3.99 4.03488 2 6.52762 2H11.4927ZM18.5402 8.5502C18.8402 8.2402 19.3302 8.2402 19.6302 8.5402L22.5502 11.4502C22.7002 11.6002 22.7802 11.7902 22.7802 12.0002C22.7802 12.2002 22.7002 12.4002 22.5502 12.5402L19.6302 15.4502C19.4802 15.6002 19.2802 15.6802 19.0902 15.6802C18.8902 15.6802 18.6902 15.6002 18.5402 15.4502C18.2402 15.1502 18.2402 14.6602 18.5402 14.3602L20.1402 12.7702H16.0002V11.2302H20.1402L18.5402 9.6402C18.2402 9.3402 18.2402 8.8502 18.5402 8.5502Z"
                    fill="white"
                  />
                </svg>
                Logout
              </a>
            </div>
          </div>
          <div id="content" className="bg-resq-100 col-span-6 rounded-lg p-6">
            <div id="24h">
              <h1 className="font-bold py-4 uppercase">Statistics</h1>
              <div
                id="stats"
                className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                  <div className="flex flex-row space-x-4 items-center">
                    <div>
                      <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                        Injured
                      </p>
                      <p className="text-white font-bold text-xl inline-flex items-center space-x-2">
                        <span>{Injured}</span>
                      </p>
                      <p>
                        <small className="text-gray-500">
                          last Updated {time}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/60 p-6 rounded-lg">
                  <div className="flex flex-row space-x-4 items-center">
                    <div>
                      <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                        Deaths
                      </p>
                      <p className="text-white font-bold text-xl inline-flex items-center space-x-2">
                        <span>{Deaths}</span>
                      </p>
                      <p>
                        <small className="text-gray-500">
                          last Updated {time}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/60 p-6 rounded-lg">
                  <div className="flex flex-row space-x-4 items-center">
                    <div>
                      <p className="text-blue-300 text-sm font-medium uppercase leading-4">
                        Evacuated
                      </p>
                      <p className="text-white font-bold text-xl inline-flex items-center space-x-2">
                        <span>{Evacuated}</span>
                      </p>
                      <p>
                        <small className="text-gray-500">
                          last Updated {time}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="last-incomes">
              <h1 className="font-bold py-4 uppercase">Emergency Requests</h1>
              <div
                id="stats"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {Emerdata.map((item, idx) => (
                  <div className="bg-black/60 to-white/5 rounded-lg">
                    <a
                      // to={{
                      // 	pathname: "/map/parameter-data",
                      // 	state: { lat: item.lat, lng: item.long },
                      // }}
                      href={`https://www.google.com/maps?q=${item.lat},%20${item.long}`}
                      target="_blank"
                    >
                      <div className="flex flex-row items-center">
                        <div className="p-2">
                          <p className="text-indigo-400 font-medium">
                            {item.FullAddress}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item.Timestamp}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div id="last-users">
              <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
              <div className="overflow-x-scroll">
                <table className="w-full whitespace-nowrap">
                  <thead className="bg-indigo-500">
                    <tr>
                      <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                      <th className="text-left py-3 px-2">Phone</th>
                      <th className="text-left py-3 px-2">Gender</th>
                      <th className="text-left py-3 px-2">Problem type</th>
                      <th className="text-left py-3 px-2">Location</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Chat</th>
                      <th className="text-left py-3 px-2 rounded-r-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-2 font-bold">
                          <div className="inline-flex space-x-3 items-center">
                            <span>{item.Name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{item.Phone}</td>
                        <td className="py-3 px-2">{item.Gender}</td>
                        <td className="py-3 px-2">{item.toh}</td>
                        <td className="py-3 px-2">{item.Place}</td>
                        <td className="py-3 px-2">
                          <label
                            for="toggle"
                            className={`mx-4 my-3 text-md ${
                              item.Evacuated != false
                                ? "text-green-700"
                                : "text-red-600"
                            }`}
                          >
                            {item.Evacuated ? "Evacuated" : "Ongoing"}
                          </label>
                        </td>
                        <td className="py-3 px-2">
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              sendMail(uuidv4(), item.FName, item.Email);
                            }}
                            target={"_blank"}
                          >
                            Live Chat
                          </p>
                        </td>
                        <td className="py-3 px-2">
                          <div className="inline-flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={item.Evacuated}
                              onClick={() =>
                                handleEvacuated(item.id, item.Evacuated)
                              }
                              name="toggle"
                              id="toggle"
                            />
                            <label for="toggle"></label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
            <div id="menu" className="flex flex-col space-y-2 my-5">
              <h4 className="text-2xl mb-4 text-text font-semibold">
                Total Donations Received
              </h4>
              <div className=" bg-indigo-500 rounded py-2 px-4 flex flex-align-center flex-justify-center flex-col ">
                {Donations.slice(2, 7).map((item, idx) => {
                  totaldona += item.donation_Amount;
                })}
                <h2 className="text-2xl text-white text-bold mb-2">
                  ₹{totaldona}
                </h2>

                <p className="text-bold text-white flex flex-align-center">
                  Last Updated {time}
                </p>
              </div>

              <hr className="my-2 border-slate-700" />

              <h2 className="text-2xl mt-6 mb-4 text-text font-semibold">
                Recent Donations
              </h2>

              {Donations.slice(2, 7).map((item, idx) => (
                <div className=" transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                  <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div className=" text-lg">$</div>
                    <div>
                      <p className="font-bold text-base lg:text-lg text-slate-800 leading-4 ">
                        {item.donorName}
                      </p>
                      <p className="text-slate-600 text-sm hidden md:block">
                        {item.residence}
                      </p>
                    </div>
                    <div className=" text-white absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">
                      +{item.donation_Amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
