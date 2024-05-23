import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "../flashMessages";
import Axios from "axios";
import { colors } from "@mui/material";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handelSearchInput = async (e) => {
    setSearchInput(e.target.value);
  };
  Axios.defaults.withCredentials = true;

  const getUser = async () => {
    await Axios.get("http://localhost:5000/checkAuth")
      .then((resp) => {
        console.log("999999999999999999999999999999999999999999999999999");
        // console.log(resp.data);
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getresult = async () => {
    await Axios.get("http://localhost:5000/listing")
      .then((resp) => {
        // console.log(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchInput !== "") {
      getresult();
    }
  }, [searchInput]);

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  const handelSearchSubmit = (e) => {
    e.preventDefault();

    if (searchInput) {
      navigate(`/listing?query=${searchInput}`);
    }
  };

  const handelKeyDown = (event) => {
    if (event.key === "Enter") {
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
            <img src={Logo} alt="AirbnbLogo" className="navbar-logo fa-brands fa-airbnb" />
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
            <Link className="nav-link" to="/listing">Explore</Link>
              </div>
              <div className="navbar-nav ms-auto">
              <input
                type="text"
                placeholder="Search destination"
                value={searchInput}
                onChange={handelSearchInput}
                className="searchinput "
                name="searchInput"
                data-bs-toggle="dropdown"
                autoComplete="off"
                onKeyDown={handelKeyDown}
              />
            </div>


            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/addNew">Atithistay your home</Link>
              {user ? (
                <>
                  <button onClick={handelLogout} className="btn">
                   <b>Logout</b> 
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/signUP"><b>Sign up</b></Link>
                  <Link className="nav-link" to="/logIn"><b>Log in</b></Link>
                </>
              )}
            </div>
          </div>
          {/* <div className="search-bar "> */}
          {/* <div className="subSearchBar dropdown "> */}

          {/* <button onClick={handelSearchSubmit} className="searchButton">
              <SearchIcon />
              Search
            </button> */}
          {/* <ul className="dropdown-menu">
              {filteredData.slice(0, 5).map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/listing?query=${item.location}`}
                    className="dropdown-item"
                  >
                    {item.location}
                  </Link>
                </li>
              ))}
            </ul> */}
          {/* </div> */}
          {/* </div> */}
          {/* <div className="profile-container">
            <Link to="/addNew">Airbnb your home</Link>
            {user ? (
              <>
                <button onClick={handelLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signUP">Sign up</Link>
                <Link to="/logIn">Log in</Link>
              </>
            )}
          </div> */}
        </div>
      </nav>
    </>
  );
}

export default Header;
