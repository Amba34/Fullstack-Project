import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    country: "",
    img: "",
    city: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (!/^\d{10}$/.test(userData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await axios.post("/auth/register", userData);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="register">
      <button className="homeButton" onClick={() => navigate("/")}>
        Home
      </button>
      <div className="registerContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (10 digits)"
            onChange={handleChange}
            required
            maxLength="10"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          
          <button type="submit">Register</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
