import React, { useEffect, useState } from "react";
import axios from "axios";
// import react slick
import Slider from "react-slick";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Image from "next/image";
import Stars from "../public/assets/Icon/stars.svg";
import ArrowBack from "../public/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "../public/assets/Icon/eva_arrow-next-fill.svg";
import TweetEmbed from "react-tweet-embed";

const Testimoni = ({
  Tweets = [
    {
      _id: "641fadbe784a06522e1e6ecc",
      disaster_tweet_ids: [
        "1639815790986768384",
        "1639815796657635328",
        "1639815831269052416",
        "1639815835895119873",
        "1639815844510449664",
        "1639815858225664003",
        "1639815902773526528",
        "1639815940866195456",
        "1639815955583737856",
        "1639816010373931008",
        "1639816136677285888",
        "1639816146403696641",
        "1639816153769050112",
        "1639816181162078209",
      ],
    },
    {
      _id: "641fb543b56c0611813f24a0",
      disaster_tweet_ids: [
        "1639824099848404992",
        "1639824136364240898",
        "1639824160938491906",
        "1639824252659707905",
        "1639824251808014338",
        "1639824253968326657",
        "1639824256585580544",
        "1639824261920456705",
      ],
    },
    {
      _id: "641fb5c8b56c0611813f24a2",
      disaster_tweet_ids: [
        "1639824330577305600",
        "1639824371253403648",
        "1639824417969815557",
        "1639824474911694849",
        "1639824511213408260",
        "1639824521900195840",
        "1639824567836237824",
        "1639824567630983168",
        "1639824656977862657",
        "1639824698211958784",
        "1639824716520210432",
        "1639824729962954755",
        "1639824738091683840",
        "1639824752377470977",
        "1639824752549216256",
        "1639824767682215939",
        "1639824787538321409",
        "1639824792571502593",
      ],
    },
    {
      _id: "641fb648b56c0611813f24a4",
      disaster_tweet_ids: [
        "1639824895143182337",
        "1639824908283944960",
        "1639824939652993030",
        "1639824942362660864",
        "1639824955318710273",
        "1639824966110842880",
        "1639824968367128583",
        "1639825044632395781",
        "1639825062881554432",
        "1639825173598666754",
        "1639825178162249731",
        "1639825250191052801",
        "1639825259074580480",
        "1639825263075917826",
        "1639825279710564352",
        "1639825283284111360",
        "1639825291374923776",
        "1639825294881345538",
        "1639825303265574912",
        "1639825306960957440",
        "1639825312488849410",
        "1639825318893748226",
        "1639825330801381376",
        "1639825333078589440",
        "1639825345439465472",
        "1639825349906415616",
        "1639825359729295360",
      ],
    },
    {
      _id: "641fb6bfb56c0611813f24a6",
      disaster_tweet_ids: [
        "1639825436082425859",
        "1639825488297295872",
        "1639825511630381056",
        "1639825524410273793",
        "1639825523386863616",
        "1639825543020392448",
        "1639825547906760710",
        "1639825548745515010",
        "1639825548829392898",
        "1639825564583493632",
        "1639825604928491520",
        "1639825629225918466",
        "1639825640638779399",
        "1639825671223377922",
        "1639825703444295680",
        "1639825749380046849",
        "1639825749577441282",
        "1639825768858685441",
        "1639825774155911168",
        "1639825814379216897",
        "1639825816379850753",
        "1639825829491523585",
        "1639825839201173505",
        "1639825856594886657",
        "1639825877239472130",
      ],
    },
    {
      _id: "641fb735b56c0611813f24a8",
      disaster_tweet_ids: [
        "1639825914644275201",
        "1639825915680288772",
        "1639825937050087427",
        "1639825945698910210",
        "1639825954972499973",
        "1639825983967571971",
        "1639825989332250626",
        "1639825996437401600",
        "1639825999784464384",
        "1639826001520730113",
        "1639826007346802688",
        "1639826018897907717",
        "1639826027278127104",
        "1639826031837335552",
        "1639826043753168897",
        "1639826045800185856",
        "1639826056990564353",
        "1639826061394362369",
        "1639826064976539649",
        "1639826115652124672",
        "1639826204214845440",
        "1639826223143460865",
        "1639826235831508994",
        "1639826308019650561",
        "1639826321952976899",
        "1639826320103473152",
        "1639826336842670083",
        "1639826363518709760",
        "1639826364302802944",
        "1639826386016690176",
      ],
    },
  ],
}) => {
  const dian = [1,2,3];
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [tweetdata, settweetdata] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  async function getTweets() {
    // const res = await axios.get(
    //   "https://ap-south-1.aws.data.mongodb-api.com/app/hackit-tngat/endpoint/crisis_tweets"
    // );
    // console.log(res.data);
    settweetdata(Tweets);
    // res.data.map((item) => {
    //   item.disaster_tweet_ids.map((itemm) => {
    //     console.log(item._id, itemm);
    //   });
    // });
  }

  // useEffect(() => {
  //   getTweets();
  // }, []);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex"
        autoplay={true}
      >
        {dian?.map((item, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-gray-500 hover:border-red-500 transition-all rounded-lg p-5 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <TweetEmbed tweetId={"1639825543020392448"} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-red-500 border hover:bg-red-500 hover:text-white transition-all text-red-500 cursor-pointer"
            onClick={sliderRef?.slickPrev}
          >
            <ArrowBack className="h-6 w-6" />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-red-500 border hover:bg-red-500 hover:text-white transition-all text-red-500 cursor-pointer"
            onClick={sliderRef?.slickNext}
          >
            <ArrowNext className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
