import "./styles/search.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const geocodeApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

function Search(props) {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();
  const isAppPage = loc.pathname.includes("/app");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setLoadingState("loading");

    if (!location) {
      console.log("Please enter a location");
      return;
    }

    fetch(
      `https://geocode.maps.co/search?q=${location}}&api_key=${geocodeApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (isAppPage && props.setSearchOpen) {
          props.setSearchOpen(false);
        }
        if (data[0].display_name !== document.querySelector("h2").textContent) {
          navigate("/app", {
            state: {
              data: {
                location: data[0].display_name,
                lat: data[0].lat,
                lon: data[0].lon,
              },
            },
          }).catch((error) => {
            console.error("Error:", error);
            props.setLoadingState("error");
          });
        } else {
          props.setLoadingState("success");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Enter Location"
        onChange={(e) => setlocation(e.target.value)}
      ></input>
    </form>
  );
}

export default Search;
