import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import processPlugins from "tailwindcss/lib/util/processPlugins";
import axios from "axios";

// import fire from "../images/icons/fire.png";
// import iceberg from "../images/icons/iceberg.png";
// import thunder from "../images/icons/thunder.png";
// import volcano from "../images/icons/volcano.png";

export default function nasamap() {
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    const getNasaData = async () => {
      const res = await axios.get(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=100"
      );
      // console.log(res.data.events);
      let temp = [];
      temp = [];
      for (let i = 0; i < res.data.events.length; i++) {
        temp.push({
          title: res.data.events[i].title,
          longitude: res.data.events[i].geometries[0].coordinates[0],
          latitude: res.data.events[i].geometries[0].coordinates[1],
          categories: res.data.events[i].categories[0].title,
        });
      }
      setEventData([{}]);
      setEventData(temp);
      temp = [];
    };

    getNasaData();
  }, []);
  console.log("naana mao ", eventData);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1mpaHajUPWU696t2u2xboKThZC-lRnnA",
  });
  const markers = eventData.map((ev, index) => {
    return (
      <Marker
        key={index}
        position={{
          lat: ev.latitude,
          lng: ev.longitude,
        }}
        // icon={{
        //   url:
        //     ev.categories == "Severe Storms"
        //       ? thunder
        //       : ev.categories == "Volcanoes"
        //       ? volcano
        //       : ev.categories == "Sea and Lake Ice"
        //       ? iceberg
        //       : ev.categories == "Wildfires"
        //       ? fire
        //       : fire,
        // }}
      />
    );
  });

  const center2 = useMemo(() => ({ lat: 28.677592, lng: 77.2913126 }), []);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <GoogleMap
        zoom={10}
        center={center2}
        mapContainerClassName="map-container"
        ClassName="map-container"
      >
        {markers}
      </GoogleMap>
    </>
  );
}
