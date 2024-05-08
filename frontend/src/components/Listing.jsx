import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardMedia, Paper } from "@mui/material";
import "./Listing.css";
function Listing() {
  const [listing, setListing] = useState({
    image: { url: "" },
    title: "",
    price: "",
    description: "",
    location: "",
    country: "",
  });

  const { id } = useParams();
  const getListing = async () => {
    try {
      await Axios.get(`http://localhost:5000/listing/${id}`).then((response) => {
        setListing(response.data);
      });
    } catch (error) {
      console.error("error fetching listing : ", error);
    }
  };
  useEffect(() => {
    getListing();
  }, []);

  const navigate = useNavigate();
  const handelDelete = async (id) => {
    await Axios.delete(`http://localhost:5000/listing/${id}`).then((response) => {
      navigate("/listing");
      console.log(response.data);
    });
  };

  return (
    <>
      <div className="container ">
        <div className=" offset-3 col-6">
          <Card sx={{ px: 1.5, boxShadow: "none" }}>
            <h2>{listing.title}</h2>
            <CardMedia
              sx={{ borderRadius: "1.5rem" }}
              component="img"
              height="240px"
              image={listing.image.url}
              alt="green iguana"
            />
            <p>{listing.description}</p>
            <p>&#8377;{listing.price}/night</p>
            <p>{listing.location}</p>
            <p>{listing.country}</p>
            <br />
            <button
              onClick={() => {
                handelDelete(id);
              }}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
            <Link to={`/listing/${id}/edit`}>
              <button type="button" className="btn btn-dark ">
                Edit
              </button>
            </Link>
          </Card>
        </div>
        <div className="review-container col-7 offset-3 ">
          <hr />
          <h3>Leave a review</h3>
          <fieldset className="starability-heartbeat">
            <p>Rating:</p>
            <input type="radio" id="first-rate1" name="rating" value="1" />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input type="radio" id="first-rate2" name="rating" value="2" />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input type="radio" id="first-rate3" name="rating" value="3" />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input type="radio" id="first-rate4" name="rating" value="4" />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input type="radio" id="first-rate5" name="rating" value="5" />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
          <br />
          <p>Comments</p>
          <textarea className="form-control mb-3"></textarea>
          <button type="button" className="btn btn-dark ">
            Submit
          </button>
          <hr />
          <h6>All Reviews</h6>
          <div className="row mb-3">
            <Paper variant="outlined">
              <h3>ldhgjhjkn</h3>
              <p>ndfgjnjk</p>
              <button type="button" className="btn btn-dark btn-sm ">
                Delete
              </button>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listing;
