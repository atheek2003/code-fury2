// import React from "react";
// import LogoVPN from "../../public/assets/logo.png";
// import Facebook from "../../public/assets/Icon/facebook.svg";
// import Twitter from "../../public/assets/Icon/twitter.svg";
// import Instagram from "../../public/assets/Icon/instagram.svg";
// import Image from "next/image";
// const Footer = () => {
//   return (
//     <div className="bg-white py-36">
//       <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
//         <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
//           <div className="flex justify-center items-center w-full">
//             <Image src={LogoVPN} width={150} height={150} />
//           </div>
//           <div className="w-full flex justify-center items-center">
//             <p className="mb-4 text-center font-bold">Help-Hive</p>
//           </div>
//           <div className="flex justify-center  w-full mt-2 mb-8 -mx-2">
//             <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
//               <Facebook className="h-6 w-6" />
//             </div>
//             <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
//               <Twitter className="h-6 w-6" />
//             </div>
//             <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
//               <Instagram className="h-6 w-6" />
//             </div>
//           </div>
//           <div className="flex justify-center w-full">
//             <p className="text-gray-400">
//               ©{new Date().getFullYear()} 
//             </p>
//           </div>
//         </div>
//         <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
//           <p className="text-black mb-4 font-medium text-lg">Join Us</p>
//           <ul className="text-black ">
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Donate{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Volunteer{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Learn{" "}
//             </li>
//           </ul>
//         </div>
//         <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
//           <p className="text-black mb-4 font-medium text-lg">Learn More</p>
//           <ul className="text-black">
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               About us{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               FAQ{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Privacy Policy{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Terms of Service{" "}
//             </li>
//           </ul>
//         </div>
//         <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
//           <p className="text-black mb-4 font-medium text-lg">Improve us</p>
//           <ul className="text-black">
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Send Complaints{" "}
//             </li>
//             <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
//               Send Queries{" "}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoVPN from "../../public/assets/logo-removebg-preview.png";
import Facebook from "../../public/assets/Icon/facebook.svg";
import Twitter from "../../public/assets/Icon/twitter.svg";
import Instagram from "../../public/assets/Icon/instagram.svg";

const Footer = () => {
  return (
    <div className="bg-white py-36">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <div className="flex justify-center items-center w-full">
            <Image src={LogoVPN} width={150} height={150} alt="Logo" />
          </div>
          <div className="w-full flex justify-center items-center">
            <p className="mb-4 text-center font-bold">Help-Hive</p>
          </div>
          <div className="flex justify-center w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Facebook} alt="Facebook" className="h-6 w-6" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Twitter} alt="Twitter" className="h-6 w-6" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Instagram} alt="Instagram" className="h-6 w-6" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <p className="text-gray-400">©{new Date().getFullYear()}</p>
          </div>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Join Us</p>
          <ul className="text-black">
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              Donate
            </li>
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              Volunteer
            </li>
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              Learn
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Learn More</p>
          <ul className="text-black">
            <li>
              <Link href="/aboutus">
                <span className="hover:text-red-600 cursor-pointer text-base">
                  About Us
                </span>
              </Link>
            </li>
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              FAQ
            </li>
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              Privacy Policy
            </li>
            <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
              Terms of Service
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black mb-4 font-medium text-lg">Improve Us</p>
          <ul className="text-black">
          <li className="my-2 hover:text-red-500 cursor-pointer transition-all">
  <a href="mailto:helphive@gmail.com">Send Complaints</a>
</li>
<li className="my-2 hover:text-red-500 cursor-pointer transition-all">
  <a href="mailto:helphive@gmail.com">Send Queries</a>
</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
