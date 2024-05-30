import  Axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "./flashMessages";

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
      navigate("/");
      showSuccessMessage("You are successfully registed!");
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="container col-xs-5 offset-sm-2 col-sm-6 offset-md-3 col-md-6 offset-lg-3 col-lg-4">
        <form onSubmit={handelSubmit} className="signup mt-5 col-xs-6 "
        style={{backgroundColor: "#e9ecef", padding: 40, borderRadius: 10, border: "black",  boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1), 2px 2px 3px rgba(0, 0, 0, 0.08)"}}>
          <h2>Sign up</h2>
          <div className="mb-3 mt-3">
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
          <div className="mb-3 ">
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
          <div className="mb-3 ">
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

          <button type="submit" className="btn btn-dark col-12 mt-2">
            Sign up
          </button>
         <p className="mt-2 text-center">Already on Atithistay?<Link style={{textDecoration: 'none'}} to="/login"> Login</Link></p> 
        </form>
      </div>
    </>
  );
};

export default SignUp;
