import React from "react";
import "../styles/navbar.css";

const Navbar = ({ setShow, size, sizeWishList, setShowCartOrWish }) => {
  return (
    <nav>
      <div className="nav_box">
        <span className="my_shop" onClick={() => setShow(true)}>All Products</span>
        <div className="cart" onClick={() => {
          setShow(false);
          setShowCartOrWish(true);
        }}>
          <span><i className="fas fa-cart-plus" ></i></span>
          <span>{size}</span>
        </div>
        <div className="wish" onClick={() => {
          setShow(false);
          setShowCartOrWish(false);
        }}>
          <span><i className="fa fa-heart" aria-hidden="true"></i></span>
          <span>{sizeWishList}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
