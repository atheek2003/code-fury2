import React, { useEffect, useState } from "react";
import TweetEmbed from "react-tweet-embed";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Tweet } from "react-tweet";

const Tweet = () => {
	const data  = [
		"1619564917228711936",
		"1619564729823006721",
		"1619564661560729600",
		"1619563719150960640",
	];

	// const Fetching = async () => {
	// 	fetch(
	// 		"https://ap-south-1.aws.data.mongodb-api.com/app/hackit-tngat/endpoint/tweets"
	// 	)
	// 		.then((response) => response.json())
	// 		.then((datas) => {
	// 			console.log("Tweets", datas);
	// 			setdata(datas[3].disaster_tweet_ids);
	// 		})
	// 		.catch((err) => console.error(err));
	// };

	// useEffect(() => {
	// 	Fetching();
	// }, []);

	return (
    <div className="w-full mt-2 mb-10" style={{ height: "max-content" }}>
      <div className="max-w-3xl mx-auto text-center pb-8">
        <h2 className="h2 mb-4 text-text">Recent Tweets</h2>
        <p className="text-lg text-gray-600">
          This Tweet Classification feature automatically classify tweets
          related to disasters into different categories. This feature can help
          to quickly identify and prioritize important information related to
          disasters.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {/* {data.map((item) => (
          <div style={{ width: "300px" }}>
            <TweetEmbed
              tweetId={"1639825543020392448"}
              placeholder="disaster tweets"
              options={{
                theme: "dark",
                cards: "hidden",
              }}
            />
            <Tweet id={"1639825543020392448"} />
          </div>
        ))} */}
        {/* <img
          src="https://www.ualberta.ca/psychiatry/media-library/images/misc-pic/under-development.jpg"
          alt="under development"
        /> */}
      </div>
    </div>
  );
};

export default Tweet;
