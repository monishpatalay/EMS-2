import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    // Make sure to call the correct URL (note the port).
    try{
        await axios.post("/register", { name, email, password });
    alert("User registered successfully");
    }
    catch(err){
        alert("User already exists");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl p-4 text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
            Register
          </button>
          <div className="text-center py-2">
            Already a member?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "gray" }}
            >
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
