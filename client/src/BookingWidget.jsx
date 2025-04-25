import { useState, useContext, use, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
// Removed redundant import of useEffect

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);  

  
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }



  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      place: place._id,
      price: numberOfDays * place.price,
      user: user?._id,
      checkIn,
      checkOut,
      noOfGuests,
      name,
      mobile,
    })
    console.log("🧠 user._id:", user?._id); // Check if it's undefined

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);

  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-5 rounded-2xl">
      <div className="mb-2 text-2xl font-semibold text-center">
        Price: ${place.price} per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex ">
          <div className="p-3 border-gray-300 w-full cursor-pointer">
            <label className="block cursor-pointer">CheckIn:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(event.target.value)}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="py-3 px-3 border-gray-300 border-l w-full cursor-pointer">
            <label className="block">CheckOut:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="py-3 px-3 border-gray-300 border-t">
        <label className="block">Number of Guests:</label>
        <input
          type="number"
          value={noOfGuests}
          onChange={(ev) => setNoOfGuests(ev.target.value)}
          className="w-full"
        />
      </div>
      {numberOfDays > 0 && (
        <div className="py-3 px-3 border-gray-300 border rounded-2xl">
          <label className="block">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full"
          />

          <label className="block">Phone Number:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(ev) => setMobile(ev.target.value)}
            className="w-full"
          />
        </div>
      )}
      <button  onClick={bookThisPlace} className="mt-4 bg-primary text-white py-2 px-4 rounded-full w-full">
        {numberOfDays > 0 ? (
          <>
            Book this place · {numberOfDays} nights · $
            {numberOfDays * place.price}
          </>
        ) : (
          "Book this place"
        )}
      </button>
    </div>
  );
}
