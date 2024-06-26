import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
export default function BusinessForm() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  function getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
          );
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function (error) {
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  getCurrentLocation();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData.entries());
    json.longitude = longitude;
    json.latitude = latitude;
    const url = "http://172.29.176.1/supplier/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "There was an error while trying to resgister Your Account",
          icon: "error",
        });
        throw new Error("Failed to register");
      }
      Swal.fire({
        title: "Success",
        text: "Account Created Successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  }
  return (
    <>
      <form id="register" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="heading">
          TURN UNSOLD FOOD INTO <span>REVENUE</span>
        </h2>
        <p>Tell us about your business to get started:</p>
        <div className="form-row">
          <label htmlFor="select">Which best describes you?</label>
        </div>
        <input type="text" name="name" placeholder="Business name" required />
        <input type="email" name="email" placeholder="Email address" required />
        <input type="text" name="city" placeholder="City" required />
        <select name="storeType" style={{ marginTop: "10px" }}>
          <option value="Sweets">Sweets</option>
          <option value="Sushi">Sushi</option>
          <option value="Cafe">Cafe</option>
          <option value="Bakery">Bakery</option>
          <option value="Supermarket">Supermarket</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Groceries">Groceries</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone number"
          required
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />
        <FormControlLabel
          sx={{
            color: "var(--main-button)",
            textAlign: "start",
            margin: "20px 0",
          }}
          control={<Checkbox required />}
          label="I agree to receive newsletters and information from Wastend by email and by SMS. I can unsubscribe at any time."
        />
        <input type="submit" className="main-button" value={"Sign Up Now"} />
        <div className="login">
          <span>Already a member?</span>
          <Link to={"/MyStoreLogin"}>Log In</Link>
        </div>
      </form>
    </>
  );
}
