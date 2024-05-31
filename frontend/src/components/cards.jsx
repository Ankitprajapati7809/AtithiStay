import Axios from "axios";
import { Card, CardMedia, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiltersIcon from "./filtersIcon";
import { Link, useLocation } from "react-router-dom";
import "./cards.css";
import {backendUrl} from "../../url";

function Cards() {
  const [searchResult, setSearchResult] = useState([]);
  const [allListing, setListing] = useState([]);
  const[filterResult, setfilterResult] = useState([]);
  const location = useLocation();

  function setPlace(data){
  console.log(data);
   const result = allListing.filter((listing)=>{
     return listing.place === data;
   })
   setfilterResult(result);
//  console.log(filterResult);
  }
  
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
    // console.log(query);
    await Axios.post(`${backendUrl}/search`, { query })
      .then((res) => {
        // console.log(res);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await Axios.get(`${backendUrl}`)

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

  return (
    <Container sx={{ marginTop: 3, padding: 0 }}>

      <FiltersIcon setPlace={setPlace} />

      <Grid container sx={{ marginTop: 3 }}>
        {(filterResult.length > 0 ? filterResult : (searchResult.length > 0 ? searchResult : allListing)).map(
          (listing) => (
            <Grid item key={listing._id} xs={12} sm={6} md={4} lg={3}>
              <Link
                to={`/${listing._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ px: 1.5, boxShadow: "none" }} className="cardstyle">
                  <CardMedia
                    sx={{ borderRadius: "1.5rem" }}
                    component="img"
                    height= "210px"
                    image={listing.image.url}
                    alt="green iguana"
                  />
                  <b>{listing.location}</b>
                  <p className="style">
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      &#8377; {listing.price}
                    </span> night
                  </p>
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
