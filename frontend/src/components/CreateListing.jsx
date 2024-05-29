import React, { useEffect, useState } from "react";
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
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateListing.css"

const CreateListing = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    image: null,
    price: 1500,
    country: "",
    location: "",
    place: "",
  });

  const handelInput = (e) => {
    setListingData({ ...listingData, [e.target.name]: e.target.value });
  };

  const handelImageInput = (e) => {
    setListingData({ ...listingData, image: e.target.files[0] });
  };

  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true); 
    try {
      console.log(listingData)
      setLoading(true);
      const response = await Axios.post(
        "http://localhost:5000/listing",
        listingData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );
      navigate("/listing");
      console.log("111111111111111")
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getForm = async () => {
    await Axios.get("http://localhost:5000/listing/verify",{withCredentials: true})
    .then(()=>{})
     .catch(()=>{
      // console.log(err)
      navigate("/login");
     }) 

  };

  useEffect(() => {
    getForm();
  }, []);

  const handelChange = (e) => {
    // console.log(e.target.value)
    setListingData({ ...listingData, [e.target.name]: e.target.value });
  };




  return (
    <div className="container offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-3 col-lg-6 ">
      <form
        onSubmit={handelSubmit}
        encType="multipart/form-data"
        validated={validated ? 'true' : undefined}
      >
        <h2 className="mt-3">Add new listing</h2>
        <div className="mb-3 mt-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="enter a catchy title"
            name="title"
            value={listingData.title}
            onChange={handelInput}
            required
          />
          <div className="invalid-feedback">Please provide a title.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="enter description"
            name="description"
            value={listingData.description}
            onChange={handelInput}
            required
          />
          <div className="invalid-feedback">Please provide a description.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handelImageInput}
            required
          />
          <div className="invalid-feedback">Please choose an image.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="1500"
            name="price"
            value={listingData.price}
            onChange={handelInput}
            required
          />
          <div className="invalid-feedback">Please provide a price.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Bharat"
            name="country"
            value={listingData.country}
            onChange={handelInput}
            required
          />
          <div className="invalid-feedback">Please provide a country.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword3" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="noida,Uttarpradesh"
            name="location"
            value={listingData.location}
            onChange={handelInput}
            required
          />
          <div className="invalid-feedback">Please provide a location.</div>
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword3" className="form-label">
          Which of these best describes your place?
          </label>
            <div className="elements " >
            <input  type="radio" className="btn-check" name="place" id="option5" autoComplete="off" value="Rooms"  onChange={handelChange} required/>
            <label className="btn btn-style" htmlFor="option5"><BedIcon className="icon-style"/><p className="text-style">Rooms</p></label>

            <input type="radio" className="btn-check" name="place" id="option6" autoComplete="off" value="Boathouse" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option6"><HouseboatIcon className="icon-style"/><p className="text-style">Boathouse</p></label>

            <input type="radio" className="btn-check" name="place" id="option7" autoComplete="off" value="Pools" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option7"><PoolIcon className="icon-style"/><p className="text-style">Pools</p></label>

            <input type="radio" className="btn-check" name="place" id="option8" autoComplete="off" value="farm" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option8"><AgricultureIcon className="icon-style"/><p className="text-style">Farm</p></label>
           
            <input type="radio" className="btn-check" name="place" id="option9" autoComplete="off" value="Beach" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option9"><BeachAccessIcon className="icon-style"/><p className="text-style">Beach</p></label>
           
            <input type="radio" className="btn-check" name="place" id="option10" autoComplete="off" value="Castles" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option10"><CastleIcon className="icon-style"/><p className="text-style">Castles</p></label>
                    
            <input type="radio" className="btn-check" name="place" id="option11" autoComplete="off" value="Tropical" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option11"><ForestIcon className="icon-style"/><p className="text-style">Tropical</p></label>
                    
            <input type="radio" className="btn-check" name="place" id="option12" autoComplete="off" value="Ski-in/out" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option12"><DownhillSkiingIcon className="icon-style"/><p className="text-style">Ski-in/out</p></label>
                    
            <input type="radio" className="btn-check" name="place" id="option13" autoComplete="off" value="Iconic Cities" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option13"><ApartmentIcon className="icon-style"/><p className="text-style">Iconic Cities</p></label>
                    
            <input type="radio" className="btn-check" name="place" id="option14" autoComplete="off" value="Arctic" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option14"><AcUnitIcon className="icon-style"/><p className="text-style">Arctic</p></label>
                    
            <input type="radio" className="btn-check" name="place" id="option15" autoComplete="off" value="Play" onChange={handelChange}/>
            <label className="btn btn-style" htmlFor="option15"><SportsBasketballIcon className="icon-style"/><p className="text-style">Play</p></label>
                    
          </div>
          </div>
        <button type="submit" className="btn btn-dark col-12 mb-5" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
export default CreateListing;
