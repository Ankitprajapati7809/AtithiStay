import  Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  Axios.defaults.withCredentials = true;
 const navigate = useNavigate();
  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    try {
      const response = await Axios.post("http://localhost:5000/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/listing");
      // console.log(response.data);
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handelSubmit} className="signup offset-3 mt-5">
          <h2>Sign up</h2>
          <div className="mb-3 col-6">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"
              value={data.username}
              onChange={handelChange}
              name="username"
            />
          </div>
          <div className="mb-3 col-6">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail2"
              placeholder="enter your email"
              value={data.email}
              onChange={handelChange}
              name="email"
            />
          </div>
          <div className="mb-3 col-6">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
              value={data.password}
              onChange={handelChange}
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
