import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Astra = () => {
  return (
    <Layout>
      <div className="mt-28 h-screen w-[98vw]">
        <div className="py-20 flex justify-center items-center h-full flex-col ">
          <iframe
            allow="microphone;"
            width="1000"
            height="700"
            src="https://console.dialogflow.com/api-client/demo/embedded/dfdeb32e-d37a-40f2-a754-6da5f455d755"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Astra;
