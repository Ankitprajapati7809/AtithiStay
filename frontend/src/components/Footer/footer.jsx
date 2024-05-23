import React from 'react'
 import '../Footer/footer.css'
export const Footer = () => {
  return (
    <>
        <div className = "f-info border-top ">
        <div className="f-info-socials">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-x-twitter"></i>
            <i className="fa-brands fa-square-instagram"></i>
        </div>
        <div className="f-info-brand" >&copy; WandeLust pvt ltd</div>
        <div className="f-info-links">
            <a href="">Privacy</a>
            <a href="">Term</a>
            <a href="">Sitmap</a>
            <a href="">Company details</a>
        </div>
    </div>
    </>

    )
}
