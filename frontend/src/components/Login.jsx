import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import Header from "./Header";
import { showSuccessMessage, showErrorMessage } from "./flashMessages";

const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const handelSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
    await Axios.post("http://localhost:5000/login"
    , data,{
        headers: {
          "Content-Type": "application/json",
        },
      } 
    )  
      .then((res)=>{
        navigate("/")
      console.log(res.data);
      showSuccessMessage(res.data)
      })
      .catch((err)=>{
        showErrorMessage(err.response.data.error);
        setData({
          username: "",
          password: "",
        })
      })

    } catch (error) {
      console.error("An error occured : ", error);
    }
  };

  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container col-xs-5 offset-sm-2 col-sm-6 offset-md-3 col-md-6 offset-lg-3 col-lg-4 ">
        <form onSubmit={handelSubmit} className="login  mt-5 col-xs-6 "
        style={{backgroundColor: "#e9ecef", padding: 40, borderRadius: 10, border: "black", boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1), 2px 2px 3px rgba(0, 0, 0, 0.08)"}}>
          <h2>Login</h2>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail3"
              placeholder="enter your username"
              name="username"
              value={data.username}
              onChange={handelChange}
              required
            />
          </div>
          <div className="mb-3 ">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword3"
              placeholder="password"
              name="password"
              value={data.password}
              onChange={handelChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark col-12 mt-2">
            Login
          </button>
          <p className="mt-2 text-center">New to Atithistay?<Link style={{textDecoration: 'none'}} to="/signup"> Signup</Link></p> 

        </form>
      </div>
    </>
  );
};

export default Login;


