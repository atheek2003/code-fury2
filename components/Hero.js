import React, { useMemo , useState, useEffect } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const Hero = ({
  listUser = [
    {
      name: "Injured",
      number: "390",
      icon: "/assets/Icon/heroicons_sm-user.svg",
    },
    {
      name: "Deaths",
      number: "20",
      icon: "/assets/Icon/gridicons_location.svg",
    },
    {
      name: "Evacuated",
      number: "50",
      icon: "/assets/Icon/bx_bxs-server.svg",
    },
  ],
  setVisible,
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const [Injured, setInjured] = useState(0);
	const [Deaths, setDeaths] = useState(0);
	const [Evacuated, setEvacuted] = useState(0);

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
		});
		setInjured(i);
		setDeaths(d);
		setEvacuted(e);
	};

  useEffect(() => {
		GetData();
	}, []);

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-normal">
              Disaster Management with <strong>Help-Hive</strong>.
            </h1>
            <p className="text-black mt-4 mb-6">
              Disasters don't wait but with <strong>Help-Hive</strong>, you'll
              always be one step ahead.
            </p>
            <div className="flex gap-x-3">
              <a href="/auth/signin">

              <ButtonPrimary>Get Started</ButtonPrimary>
              </a>
              <div onClick={() => setVisible(true)}>
                <ButtonPrimary>Urgent Help</ButtonPrimary>
              </div>
              <a href="https://resqmate-nasa-maps.vercel.app/nasamap">
                <ButtonPrimary>Nasa Pridiction</ButtonPrimary>
              </a>
            </div>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              {/* <Image
                src="/assets/fire_house-removebg-preview.png"
                alt="house on fire"
                quality={100}
                width={612}
                height={383}
                layout="responsive"
              /> */}
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white z-10">
          {/* {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src={listUsers.icon} className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))} */}
          <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              custom={{ duration: 2  }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src="/assets/Icon/heroicons_sm-user.svg" className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black font-bold">
                  {Injured}
                  </p>
                  <p className="text-lg text-black">Injured</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              custom={{ duration: 2  }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src="/assets/Icon/gridicons_location.svg" className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black font-bold">
                  {Deaths}
                  </p>
                  <p className="text-lg text-black">Deaths</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              custom={{ duration: 2  }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <img src="/assets/Icon/bx_bxs-server.svg" className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black font-bold">
                  {Evacuated}
                  </p>
                  <p className="text-lg text-black">Evacuated</p>
                </div>
              </div>
            </motion.div>
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
