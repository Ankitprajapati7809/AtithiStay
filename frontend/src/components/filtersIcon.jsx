import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BedIcon from "@mui/icons-material/Bed";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import PoolIcon from "@mui/icons-material/Pool";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CastleIcon from "@mui/icons-material/Castle";
import ForestIcon from "@mui/icons-material/Forest";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import "./filtersIcon.css";
import { Link } from "react-router-dom";

function FiltersIcon( props) {
// const [place, setPlace] = useState();
  const handleClick = (name) => {
   props.setPlace(name);
  };

  return (
    <>
      <div className="horizontal-line"></div>
      <div className="filters mt-3">
        <Link to={`?query=${"Trending"}`} className="link-style" onClick={() => handleClick("Trending")}>
          <div className="filter">
            <div className="icon">
              <WhatshotIcon />
            </div>
            <p>Trending</p>
          </div>
        </Link>
        <Link  className="link-style" onClick={() => handleClick("Rooms")}>
          <div className="filter">
            <div className="icon">
              <BedIcon />
            </div>
            <p>Rooms</p>
          </div>
        </Link>
        <Link className="link-style" onClick={() => handleClick("Boathouse")}>
          <div className="filter">
            <div className="icon">
              <HouseboatIcon />
            </div>
            <p>Boathouse</p>
          </div>
        </Link>
        <Link className="link-style olg" onClick={() => handleClick("Pools")}>
          <div className="filter">
            <div className="icon">
              <PoolIcon />
            </div>
            <p>Amazing pools</p>
          </div>
        </Link>
        <Link className="link-style olg" onClick={() => handleClick("farm")}>
          <div className="filter">
            <div className="icon">
              <AgricultureIcon />
            </div>
            <p>Farm</p>
          </div>
        </Link>
        <Link className="link-style olg" onClick={() => handleClick("Beach")}>
          <div className="filter">
            <div className="icon">
              <BeachAccessIcon />
            </div>
            <p>Beach</p>
          </div>
        </Link>
        <Link className="link-style olg" onClick={() => handleClick("Castles")}>
          <div className="filter">
            <div className="icon">
              <CastleIcon />
            </div>
            <p>Castles</p>
          </div>
        </Link>
        <Link  className="link-style olg olgs" onClick={() => handleClick("Tropical")}>
          <div className="filter">
            <div className="icon">
              <ForestIcon />
            </div>
            <p>Tropical</p>
          </div>
        </Link>
        <Link  className="link-style olg olgs" onClick={() => handleClick("Ski-in/out")}>
          <div className="filter">
            <div className="icon">
              <DownhillSkiingIcon />
            </div>
            <p>Ski-in/out</p>
          </div>
        </Link>
        <Link  className="link-style olg olgs" onClick={() => handleClick("Iconic Cities")}>
          <div className="filter">
            <div className="icon">
              <ApartmentIcon />
            </div>
            <p>Iconic Cities</p>
          </div>
        </Link>
        <Link className="link-style olg olgs" onClick={() => handleClick("Arctic")}>
          <div className="filter">
            <div className="icon">
              <AcUnitIcon />
            </div>
            <p>Arctic</p>
          </div>
        </Link>
        <Link className="link-style olg olgs" onClick={() => handleClick("Play")}>
          <div className="filter">
            <div className="icon">
              <SportsBasketballIcon />
            </div>
            <p>Play</p>
          </div>
        </Link>
      </div>
      <div className="horizontal-line-with-shadow"></div>
    </>
  );
}

export default FiltersIcon;
