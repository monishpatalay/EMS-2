import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="m-8 text-center">
        List of places
        <br />
        <Link
          className="inline-flex bg-primary gap-2 text-white py-2 px-4 rounded-full"
          to="/account/places/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            />
          </svg>
          Add New Place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/' + place._id} className="border bg-gray-100 cursor-pointer rounded-xl p-4 mb-4 shadow flex gap-4  items-center">
              <div className="flex h-32 w-32  shrink-0 bg-gray-300 rounded-xl overflow-hidden">
              <PlaceImg place={place} />

              </div>
              <div className="grow-0 shrink">
                <h2 className="text-lg font-semibold">{place.title}</h2>
                <p className="text-md text-gray-500 mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

