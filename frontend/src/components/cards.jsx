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
  const [filterResult, setfilterResult] = useState([]);
  const [isLoading, setisLoading] = useState(true);
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
        setisLoading(false)

        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  // Function to render skeleton cards
  // const renderSkeletonCards = (count) => {
  //   return Array.from({ length: count }).map((_, index) => (
  //     <Grid item key={index} xs={10} sm={6} md={4} lg={3}>
  //       <SkeletonTheme baseColor="#202020" highlightColor="#f5f5f5">
  //         <Card sx={{ px: 1.5, boxShadow: "green" }} className="card-skeleton">
  //           <Skeleton height={210} style={{ borderRadius: "1.5rem" }} />
  //           <Skeleton height={20} width="60%" count={3}/>
  //           <Skeleton height={20} width="40%" />
  //         </Card>
  //       </SkeletonTheme>
  //     </Grid>
  //   ));
  // };

  return (
    <Container sx={{ marginTop: 3, padding: 0 }}>

      <FiltersIcon setPlace={setPlace} />
      <Grid container sx={{ marginTop: 3 }}>
      {isLoading ? (
          // renderSkeletonCards(8) // Show 8 skeleton cards while loading
          <div className="loader offset-6 mt-5"></div>
        ) : (
        (filterResult.length > 0 ? filterResult : (searchResult.length > 0 ? searchResult : allListing)).map(
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
          ))
        )}
        {/* <div class="loader"></div> */}

      </Grid>
    </Container>
  );
}

export default Cards;
