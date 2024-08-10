import React, { useMemo } from "react";
import Image from "next/image";
import Testimoni from "./Testimoni";
import ButtonPrimary from "./misc/ButtonPrimary";
import ButtonOutline from "./misc/ButtonOutline.";
import Maps from "../public/assets/HugeGlobal.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import Link from "next/link";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-white to-white w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-relaxed"
            >
              Guide to ResQ-MAte
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              Let's us give a road-map to our services
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  <Image
                    src="/assets/emergency-removebg-preview.png"
                    width={145}
                    height={165}
                    alt="Free Plan"
                  />
                </div>
                <p className="text-lg text-black font-medium capitalize my-2 sm:my-7">
                  Call for help
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black flex-grow">
                  <li className="relative check custom-list my-2">
                    Urgent help allows you to share your location with NGOs or
                    police
                  </li>
                  <li className="relative check custom-list my-2">
                    Through help form you can explain your problem in detail and
                    soon someone from NGO/Police will get in touch
                  </li>
                  <li className="relative check custom-list my-2">
                    Live location sharing and getting in contact with an
                    volunteer/police.
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-5">
                  <ButtonOutline>Explore</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  <Image
                    src="/assets/disaster_ready-removebg-preview.png"
                    width={145}
                    height={165}
                    alt="Standard Plan"
                  />
                </div>
                <p className="text-lg text-black font-medium capitalize my-2 sm:my-7">
                  Be always Disaster-Ready
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black flex-grow">
                  <li className="relative check custom-list my-2">
                    See important SOS tweets/breaking news trending on Social
                    media
                  </li>
                  <li className="relative check custom-list my-2">
                    Learn evacuation/precautionary DO's & DONOT's from our
                    AI-BOT
                  </li>
                  <li className="relative check custom-list my-2">
                    Learn about previous list of disaters in India from PREVIOUS
                    DISASTER tab
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-5">
                  <ButtonOutline>Explore</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  <Image
                    src="/assets/stay_updated-removebg-preview.png"
                    width={145}
                    height={165}
                    alt="Premium Plan"
                  />
                </div>
                <p className="text-lg text-black font-medium capitalize my-2 sm:my-7">
                  Stay updated
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black flex-grow">
                  <li className="relative check custom-list my-2">
                    Community Bullentin{" "}
                    {
                      "(Get live disaster alerts , precautionary info and rescue & relief alerts )"
                    }
                  </li>
                  <li className="relative check custom-list my-2">
                    Subcribe to us to get instant SMS updates/alerts/news
                  </li>
                  <li className="relative check custom-list my-2">
                    Get live stats on deaths and injuries
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-5">
                  <ButtonOutline>Explore</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto"
            >
              Huge Global Network of Disaster Management{" "}
            </motion.h3>
            <motion.p
              className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12"
              variants={scrollAnimation}
            >
              Make it easier for you when any disaster hit.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div
              className="py-12 w-full px-8 mt-16"
              variants={scrollAnimation}
            >
              <Maps className="w-full h-auto" />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper></ScrollAnimationWrapper>
        </div>
        <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-normal w-9/12 sm: lg:w-4/12 mx-auto"
            >
              Live Tweets{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the lastest tweets regarding the help in disaster.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              {/* <Testimoni /> */}
              <div className="flex justify-center">
              <img src="https://www.ualberta.ca/psychiatry/media-library/images/misc-pic/under-development.jpg" />
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{ duration: 3 }}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="text-black text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Register for <br /> Instant Critical Alerts!
                  </h5>
                  <p>Let's join with us.</p>
                </div>
                <ButtonPrimary>
                  <Link href={"/registerNumber"}>Get Started</Link>
                </ButtonPrimary>
              </div>
              <div
                className="absolute bg-black opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
              ></div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
