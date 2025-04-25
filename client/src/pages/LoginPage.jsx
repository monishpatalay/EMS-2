import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx"; // Adjust the import path as necessary



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
    ev.preventDefault();
    // Make sure to call the correct URL (note the port).
    try{
        const {data} = await axios.post("http://localhost:3000/login", { email, password });
        setUser(data);
        alert("User logged in successfully");
        setRedirect(true);
    }
    catch(err){
        alert("User not found");
    }
  } 

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl p-4 text-center">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className="btn-primary">
            Login
          </button>
          <div className="text-center py-2">
            Dont have an account yet?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "underline", color: "gray" }}
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
