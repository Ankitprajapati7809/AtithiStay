import React, { useEffect, useState } from "react";
import "./styles.css";
import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../assets/logo/Atithistay-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage } from "../flashMessages";
import Axios from "axios";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    getUser();
    getresult();
  }, []);

  const getUser = async () => {
    try {
      const resp = await Axios.get("http://localhost:5000/checkAuth");
      console.log(resp)
      setUser(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getresult = async () => {
    try {
      const resp = await Axios.get("http://localhost:5000/listing");
      setData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      const filteredSuggestions = data.filter((item) =>
        item.location.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchInput, data]);

  const handelSearchInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleSuggestionClick = (suggestion) => {
    // setSearchInput(suggestion.location);
    setShowSuggestions(false);
    navigate(`/listing?query=${suggestion.location}`);
  };

  const handelSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      setShowSuggestions(false);
      navigate(`/listing?query=${searchInput}`);
    }
  };

  const handelKeyDown = (event) => {
    if (event.key === "Enter") {
      setShowSuggestions(false);
      navigate(`/listing?query=${searchInput}`);
    }
  };

  const handelLogout = async () => {
    const response = await Axios.get("http://localhost:5000/logout");
    showSuccessMessage(response.data);
    navigate("/listing");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <Link to="/listing" className="navbar-brand">
            <img
              src={Logo}
              alt="AirbnbLogo"
              className="navbar-logo fa-brands fa-airbnb"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <Link className="nav-link" to="/listing">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                >
                  Explore
                </span>
              </Link>
            </div>
            <div className="navbar-nav ms-auto search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search destination"
                  value={searchInput}
                  onChange={handelSearchInput}
                  className="searchinput "
                  name="searchInput"
                  autoComplete="off"
                  onKeyDown={handelKeyDown}
                />
                {showSuggestions && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <PlaceIcon style={{ color: "gray" }} />
                        {suggestion.location}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={handelSearchSubmit} className="searchButton">
                <SearchIcon />
              </button>
            </div>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/addNew">
                <span
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                >
                  Atithistay your home
                </span>
              </Link>
              {user ? (
                <>
                  <button onClick={handelLogout} className="btn ">
                    <b
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                    >
                      Logout
                    </b>
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/logIn">
                    <b
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                    >
                      Log in
                    </b>
                  </Link>
                  <Link className="nav-link" to="/signUP">
                    <b
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                    >
                      Sign up
                    </b>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
