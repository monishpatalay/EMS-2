import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);

  return (
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/place/` + place._id} key={place._id} className="cursor-pointer">
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    src={place.photos?.[0]}
                    alt={place.title || ""}
                  />
                )}
              </div>
              <h2 className="font-bold" >{place.address}</h2>
              <h3 className="text-sm truncate" >{place.title}</h3>
            <div className="mt-1"> 
                <span className="font-bold" > ${place.price} </span> 
                Per Night
            </div>
            </Link>
          ))}
      </div>
  );
}
