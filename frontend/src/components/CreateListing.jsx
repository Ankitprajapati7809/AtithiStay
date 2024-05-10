import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [validated, setValidated] = useState(false);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    image: null,
    price: 1500,
    country: "",
    location: "",
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
      const response = await Axios.post(
        "http://localhost:5000/listing",
        listingData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/listing");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getForm = async () => {
    await Axios.get("http://localhost:5000/listing/verify", {
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
      navigate("/login");
    });
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <div className="container ">
      <form
        className="offset-3 col-6 "
        onSubmit={handelSubmit}
        encType="multipart/form-data"
        // noValidate
        validated={validated}
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateListing;
