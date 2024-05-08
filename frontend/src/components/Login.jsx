import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
    await Axios.post("http://localhost:5000/login"
    , data,{
        headers: {
          "Content-Type": "application/json",
        },
      } 
    )  
      .then((res)=>{
        navigate("/listing")
      console.log(res.data);
      })
      .catch((err)=>{
        console.log(err)
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
      <div className="container">
        <form onSubmit={handelSubmit} className="signup offset-3 mt-5">
          <h2>Login</h2>
          <div className="mb-3 col-6">
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
          <div className="mb-3 col-6">
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;


