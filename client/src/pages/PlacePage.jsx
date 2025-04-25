import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";


export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

 

  return (
    <div className="mt-4 bg-gray-100 pt-8 px-8 -mx-8 rounded-2xl">
      <h1 className="text-3xl">{place.title}</h1>

    <AddressLink>{place.address}</AddressLink>
      
     <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          <b>Check-In:</b> {place.checkIn}
          <br />
          <b>Check-Out:</b> {place.checkOut}
          <br />
          <b>Max Guests:</b> {place.maxGuests}
          <br />
          <br />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 p-8 border-t border-gray-200  rounded-l">
        <div>
          <h2 className="text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
