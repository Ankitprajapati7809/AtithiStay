import React from "react";
import FiltersIcon from "../filtersIcon";
import { Card, CardMedia, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const SearchComponent = ({ result }) => {
  console.log(result);
  return (
    <Container sx={{ marginTop: 3, padding: 0 }}>
      <FiltersIcon />
      <Grid container>
        {result.map((listing) => (
          <Grid item key={listing._id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/${listing._id}`}>
              <Card sx={{ px: 1.5, boxShadow: "none" }}>
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
        ))}
      </Grid>
    </Container>
  );
};

export default SearchComponent;
