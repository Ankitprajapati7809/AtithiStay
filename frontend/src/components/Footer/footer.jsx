import React from "react";
import "../Footer/footer.css";
export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="f-info border-top ">
          <div className="f-info-socials">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-x-twitter"></i>
            <i className="fa-brands fa-square-instagram"></i>
          </div>
          <div className="f-info-brand mt-2">&copy; AtithiStay pvt ltd</div>
          <div className="f-info-links mt-2 ">
            <a href="#">Privacy</a>
            <a href="#">Term</a>
            <a href="#">Company details</a>
          </div>
        </div>
      </div>
    </>
  );
};
