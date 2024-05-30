import CreateListing from "./components/CreateListing";
import Header from "./components/Header";
import BottomNavigation from "./components/Header/bottomNav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Cards from "./components/cards";
import Listings from "./components/Listing";
import Edit from "./components/Edit";
import SearchComponent from "./components/Header/SearchComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components/Footer/footer";
// import { AuthProvider } from './components/AuthContext';


import "./App.css";

function App() {
  return (
    <>
    {/* <AuthProvider> */}
      <div className="page-container">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route exact path="/" element={<Cards />} />
            <Route exact path="/:id" element={<Listings />} />
            <Route exact path="/:id/edit" element={<Edit />} />
            <Route path="/addNew" element={<CreateListing />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/search" element={<SearchComponent />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {/* <BottomNavigation /> */}
      <ToastContainer />
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
