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
function FiltersIcon() {
  
  return (
     <>

    <div className="horizontal-line"></div>
  <div className="filters mt-3">
    <Link to={`/listing?query=${"Trending"}`} className="link-style" >
      <div className="filter">
        <div className="icon">
          <WhatshotIcon />
        </div>
        <p>Trending</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Rooms"}`} className="link-style">
      <div className="filter">
        <div className="icon">
          <BedIcon />
        </div>
        <p>Rooms</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Boathouse"}`} className="link-style">
      <div className="filter">
        <div className="icon">
          <HouseboatIcon />
        </div>
        <p>Boathouse</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"pools"}`} className="link-style olg">
      <div className="filter">
        <div className="icon">
          <PoolIcon />
        </div>
        <p>Amazing pools</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"farm"}`} className="link-style olg">
      <div className="filter">
        <div className="icon">
          <AgricultureIcon />
        </div>
        <p>Farm</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Beach"}`} className="link-style olg">
      <div className="filter">
        <div className="icon">
          <BeachAccessIcon />
        </div>
        <p>Beach</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Castles"}`} className="link-style olg">
      <div className="filter">
        <div className="icon">
          <CastleIcon />
        </div>
        <p>Castles</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Tropical"}`} className="link-style olg olgs">
      <div className="filter">
        <div className="icon">
          <ForestIcon />
        </div>
        <p>Tropical</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Ski-in/out"}`} className="link-style olg olgs">
      <div className="filter">
        <div className="icon">
          <DownhillSkiingIcon />
        </div>
        <p>Ski-in/out</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Iconic Cities"}`} className="link-style olg olgs">
      <div className="filter">
        <div className="icon">
          <ApartmentIcon />
        </div>
        <p>Iconic Cities</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Arctic"}`} className="link-style olg olgs">
      <div className="filter">
        <div className="icon">
          <AcUnitIcon />
        </div>
        <p>Arctic</p>
      </div>
    </Link>
    <Link to={`/listing?query=${"Play"}`} className="link-style olg olgs">
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
