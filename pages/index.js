import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import Head from "next/head";
import logo from "../public/assets/logo.png";
import { useState } from "react";
import Pop from "../components/Pop";

export default function Home() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Head>
        <title>Help-Hive</title>
        <link
          rel="shortcut icon"
          href="https://user-images.githubusercontent.com/86917304/226326061-cd601c44-8c19-4f0c-bd57-53274374cd6c.png"
          type="image/x-icon"
        />
      </Head>
      <Layout>
        <Hero setVisible={setVisible} />
        {visible && (
          <Pop
            text={
              "This help will be consider as the first priority, So Trigger this wisely"
            }
            title={"Do you really want emergency help?"}
            setVisible={setVisible}
          />
        )}
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}
