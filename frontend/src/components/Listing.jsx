import React, { useEffect, useState } from "react";
import Axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardMedia, Paper } from "@mui/material";
import {
  showSuccessMessage,
  showErrorMessage,
  showInfoMessage,
} from "./flashMessages";

import "./Listing.css";
function Listing() {
  const [listing, setListing] = useState({
    image: { url: "" },
    title: "",
    price: "",
    description: "",
    location: "",
    owner: [],
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
      await Axios.get(`http://localhost:5000/${id}`).then(
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
      await Axios.delete(`http://localhost:5000/${id}`, {
        withCredentials: true,
      }).then((response) => {
        navigate("/");
        showSuccessMessage("Listing deleted successfully!");
        console.log(response.data);
      });
    } catch (error) {
      if (error.response.status === 403) {
        showInfoMessage("First, login before deleting the Listing.");
      } else if (error.response.status === 405) {
        showErrorMessage(
          "You can't delete this Listing because you're not the owner."
        );
      }
    }
  };

  const handelSubmit = async () => {
    await Axios.post(`http://localhost:5000/${id}/review`, userReview, {
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
        `http://localhost:5000/${id}/review/${reviewId}`,
        {
          withCredentials: true,
        }
      ).then((response) => {
        // navigate("/listing");
        // console.log(response.request.status);
        if (response.request.status === 200) {
          setListing(
            (prevListing) => ({
              ...prevListing,
              reviews: prevListing.reviews.filter(
                (review) => review._id !== reviewId
              ),
            }),
            showSuccessMessage("Review Deleted successfully!")
          );
        } else {
          console.error(
            "Failed to update the review after successful deletion"
          );
        }
      });
    } catch (error) {
      // console.log(error);
      if (error.response.status === 403) {
        showInfoMessage("First, login before deleting the Review.");
      } else if (error.response.status === 405) {
        showErrorMessage(
          "You can't delete this review because you're not the owner."
        );
      }
    }
  };

  return (
    <>
      <div className="container mt-3 ">
        <div className="offset-xs-1 col-xs-6 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-3 col-lg-6 ">
          <Card sx={{ px: 1.5, boxShadow: "none" }}>
            <h4>{listing.title}</h4>
            <CardMedia
              sx={{ borderRadius: "1.5rem" }}
              component="img"
              height="240px"
              image={listing.image.url}
              alt="green iguana"
            />
            <p><i>Owned by - {listing.owner.username}</i></p>
            <p>{listing.description}</p>
            <b>&#8377;{listing.price}/night</b>
            <p className="mt-3"><PlaceIcon style={{ color: "gray" , fontSize: "20"}} /> {listing.location}</p>
            <p> {listing.country}</p>
            <br />
            <button
              onClick={() => {
                handelDelete(id);
              }}
              type="button"
              className="btn btn-danger col-6 rounded-end-0"
            >
              Delete
            </button>
            <Link to={`/${id}/edit`}>
              <button
                type="button"
                className="btn btn-dark col-6 rounded-start-0 "
              >
                Edit
              </button>
            </Link>
          </Card>
        </div>
        <div className="review-container offset-xs-1 col-xs-6 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-3 col-lg-6">
          <hr />
          <div>
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
          </div>
          <div className=" row mb-3  ">
            {listing.reviews.map((review, index) => {
              return (
                <Paper
                  variant="outlined"
                  className="review col-10 col-md-5 mt-3"
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
                        {review.rating}
                      </p>
                    </h6>
                    <p>- {review.review}</p>

                    <button
                      onClick={() => deleteReview(review._id)}
                      type="button"
                      className="btn  btn-sm mb-1 "
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
