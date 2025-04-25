import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage = "profile" } = useParams();

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

 

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged in as <strong>{user.name}</strong> ({user.email})
          <br />
          <button
            onClick={logout}
            className="bg-primary text-white px-4 py-2 rounded-full mt-4 max-w-sm"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
