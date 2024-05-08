import Axios from "axios";
import { Card, CardMedia, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiltersIcon from "./filtersIcon";
import { Link, useLocation } from "react-router-dom";
import "./cards.css"

function Cards() {
  const [searchResult, setSearchResult] = useState([]);
  const [allListing, setListing] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      // setSearchInput(query);
      // console.log(query)
      // console.log(searchInput)
      getSearchData(query);
    }
  }, [location.search]);

  const getSearchData = async (query) => {
    console.log(query);
    await Axios.post("http://localhost:5000/search", { query })
      .then((res) => {
        console.log(res);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await Axios.get("http://localhost:5000/listing")

      .then((response) => {
        setListing(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(searchInput);
  // }, [searchInput]);

  return (
    <Container sx={{ marginTop: 3, padding: 0 }}>
      <FiltersIcon />
      <Grid container>
        {(searchResult.length > 0 ? searchResult : allListing).map(
          (listing) => (
            <Grid item key={listing._id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/listing/${listing._id}`}>
                <Card sx={{ px: 1.5, boxShadow: "none" }} className="cardstyle">
                  <CardMedia
                    sx={{ borderRadius: "1.5rem" }}
                    component="img"
                    height="240px"
                    image={listing.image.url}
                    alt="green iguana"
                  />
                  <b>{listing.title}</b>
                  <p>&#8377;{listing.price}/night</p>
                </Card>
              </Link>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}

export default Cards;
