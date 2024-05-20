import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../assets/logo/long-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "../flashMessages";
import Axios from "axios";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const handelSearchInput = async (e) => {
    setSearchInput(e.target.value);
  };
  Axios.defaults.withCredentials = true;

  const getUser = async()=>{
    await Axios.get("http://localhost:5000/checkAuth")
      .then((resp) => {
        // console.log(resp.data);
         setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };   

  useEffect(()=>{
    getUser();
  },[])

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
    showSuccessMessage(response.data)
    navigate("/listing");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/listing">
          <img src={Logo} alt="AirbnbLogo" className="navbar-logo" />
        </Link>
        <div className="search-bar">
          <div className="subSearchBar dropdown">
            <input
              type="text"
              placeholder="Search destination"
              value={searchInput}
              onChange={handelSearchInput}
              className="input"
              name="searchInput"
              data-bs-toggle="dropdown"
              autoComplete="off"
              onKeyDown={handelKeyDown}
            />
            <button onClick={handelSearchSubmit} className="searchButton">
              <SearchIcon />
              Search
            </button>
            <ul className="dropdown-menu">
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
            </ul>
          </div>
        </div>
        <div className="profile-container">
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
        </div>
      </div>
    </>
  );
}

export default Header;
