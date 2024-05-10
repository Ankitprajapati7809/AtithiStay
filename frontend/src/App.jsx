import { useState, useEffect } from "react";
import CreateListing from "./components/CreateListing";
import Header from "./components/Header";
import BottomNavigation from "./components/Header/bottomNav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Checkauth from "./components/checkauth";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cards from "./components/cards";
import Listings from "./components/Listing";
import Edit from "./components/Edit";
import SearchComponent from "./components/Header/SearchComponent";
import Axios from "axios";
import CurrentUser from "./components/currUser";

// import './App.css'
function App() {
  // const [user, setUser] = useState('');
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await Axios.get("http://localhost:5000/checkauth", {
  //         withCredentials: true,
  //       });
  //       if(response.status == 200){
  //         setUser(response.data)
  //       }
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  return (
    <>
        <CurrentUser/>
        <Header />
        <Routes>
          <Route exact path="/listing" element={<Cards />} />
          <Route exact path="/listing/:id" element={<Listings />} />
          <Route exact path="/listing/:id/edit" element={<Edit />} />
          {/*<Route
            path="/addNew"
            element={user ? <CreateListing /> : <Navigate to="/login" />}
          />*/}
           <Route
            path="/addNew"
            element={ <CreateListing />}
          /> 
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/checkauth" element={<Checkauth />} />
          <Route exact path="/search" element={<SearchComponent />} />
        </Routes>

      {/* <BottomNavigation /> */}
    </>
  );
}

export default App;
