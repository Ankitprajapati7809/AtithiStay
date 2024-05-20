import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardMedia, Paper } from "@mui/material";
import { showSuccessMessage, showErrorMessage, showInfoMessage } from "./flashMessages";

import "./Listing.css";
function Listing() {

  // const handleError = () => {
  //   showErrorMessage("Something went wrong.");
  // };

  const [listing, setListing] = useState({
    image: { url: "" },
    title: "",
    price: "",
    description: "",
    location: "",
    country: "",
    reviews: [],
  });

  const [userReview, setuserReview] = useState({
    review: "",
    rating: "3",
  });

  const { id } = useParams();
  const getListing = async () => {
    try {
      await Axios.get(`http://localhost:5000/listing/${id}`).then(
        (response) => {
          // console.log(response.data);
          setListing(response.data);
        }
      );
    } catch (error) {
      console.error("error fetching listing : ", error);
    }
  };
  useEffect(() => {
    getListing();
  }, []);

  const navigate = useNavigate();
  const handelDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/listing/${id}`, {
        withCredentials: true,
      }).then((response) => {
        navigate("/listing");
        showSuccessMessage("Listing deleted successfully!");
        console.log(response.data);
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handelSubmit = async () => {
    await Axios.post(`http://localhost:5000/listing/${id}/review`, userReview, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      setuserReview({ review: "", rating: "3" });
      getListing();
      showSuccessMessage("Review added successfully!");

    });
  };
  const handelChange = (e) => {
    setuserReview({ ...userReview, [e.target.name]: e.target.value });
  };

  const deleteReview = async (reviewId) => {
    // console.log("id : ",reviewId)
    try {
      await Axios.delete(
        `http://localhost:5000/listing/${id}/review/${reviewId}`,
        {
          withCredentials: true,
        }
      ).then((response) => {
        // navigate("/listing");
        // console.log(response.request.status);
        if (response.request.status === 200) {
          setListing((prevListing) => ({
            ...prevListing,
            reviews: prevListing.reviews.filter(
              (review) => review._id !== reviewId
            ),
          }));
          showSuccessMessage("Review deleted successfully!");   
        } else {
          console.error(
            "Failed to update the review after successful deletion"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
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
            <p>{listing.owner}</p>
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
          <fieldset className="starability-slot">
            <p>Rating:</p>
            <input
              type="radio"
              id="first-rate1"
              name="rating"
              value="1"
              onChange={handelChange}
            />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name="rating"
              value="2"
              onChange={handelChange}
            />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name="rating"
              value="3"
              onChange={handelChange}
            />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name="rating"
              value="4"
              onChange={handelChange}
            />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name="rating"
              value="5"
              onChange={handelChange}
            />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
          <br />
          <p>Comments</p>
          <textarea
            className="form-control mb-3"
            name="review"
            value={userReview.review}
            onChange={handelChange}
          ></textarea>
          <button
            onClick={handelSubmit}
            type="button"
            className="btn btn-dark "
          >
            Submit
          </button>
          <hr />
          <h6 style={{ marginLeft: "15px" }}>All Reviews</h6>

          <div className="row mb-3 ">
            {listing.reviews.map((review, index) => {
              return (
                <Paper
                  variant="outlined"
                  className=" col-5 mt-3"
                  key={index}
                  style={{ marginLeft: "20px" }}
                >
                  <div className="mt-2" style={{ marginLeft: "20px" }}>
                    <h6 className="row">
                      {review.reviewOwner.username}
                      <p
                        style={{ marginLeft: "20px" }}
                        className="starability-result"
                        data-rating={review.rating}
                      >
                        {review.rating} stars
                      </p>
                    </h6>
                    <p>{review.review}</p>

                    <button
                      onClick={() => deleteReview(review._id)}
                      type="button"
                      className="btn btn-dark btn-sm "
                    >
                      Delete
                    </button>
                  </div>
                </Paper>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Listing;
