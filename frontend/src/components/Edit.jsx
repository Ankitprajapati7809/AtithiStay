import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  showSuccessMessage,
  showErrorMessage,
  showInfoMessage,
} from "./flashMessages";

function Edit() {
  const [edit, setEdit] = useState({
    title: "",
    description: "",
    image: "",
    newImage: null, // New image being uploaded
    price: 1500,
    country: "",
    location: "",
  });
  const [loading, setLoading] = useState(false); 


  const { id } = useParams();
  const getData = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:5000/listing/${id}/edit`,
        {
          withCredentials: true,
        }
      );
      //  console.log(response)
      setEdit((prevState) => ({
        ...prevState,
        title: response.data.title,
        description: response.data.description,
        image: response.data.image, // Set original image
        price: response.data.price,
        country: response.data.country,
        location: response.data.location,
      }));
    } catch (error) {
      if (error.response.request.status === 403) {
        showInfoMessage("First, login before Editing the listing.")
        navigate("/login");
      } else {
        if(error.request.status === 402){
          showInfoMessage(error.response.data.error)
        }
        navigate(`/listing/${id}`);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelInput = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handelImageInput = (e) => {
    setEdit({ ...edit, newImage: e.target.files[0] });
  };

  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", edit.title);
      formData.append("description", edit.description);
      formData.append("price", edit.price);
      formData.append("country", edit.country);
      formData.append("location", edit.location);
      if (edit.newImage) {
        formData.append("image", edit.newImage);
      } else {
        formData.append("image", edit.image);
        console.log(edit.image);
      }
      setLoading(true);

      await Axios.patch(`http://localhost:5000/listing/${id}/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // console.log(response.data);
      showSuccessMessage("You have successfully Edited.")
      setLoading(false);
      navigate("/listing");
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  };
  return (
    <div className="container ">
      <form
        className="offset-3 col-6"
        onSubmit={handelSubmit}
        encType="multipart/form-data"
      >
        <h2 className="mt-3">Edit listing</h2>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="enter a catchy title"
            name="title"
            value={edit.title}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="enter description"
            name="description"
            value={edit.description}
            onChange={handelInput}
          />
        </div>
        <div className="originlListing">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Original Image
          </label>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={edit.image.url}
              className="card-img-top"
              alt="loading..."
            />
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            // value={listingData?.image}
            onChange={handelImageInput}
          />
        </div>
        <div className="row inLine">
          <div className="mb-3 col-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="1500"
              name="price"
              value={edit.price}
              onChange={handelInput}
            />
          </div>
          <div className="mb-3 col-7">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Bharat"
              name="country"
              value={edit.country}
              onChange={handelInput}
            />
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputPassword3" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="noida,Uttarpradesh"
            name="location"
            value={edit.location}
            onChange={handelInput}
          />
        </div>

        <button type="submit" className="btn btn-dark col-12 mb-5" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Edit;
