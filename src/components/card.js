// Cards.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Cart from "../services/cart-service";

const Cards = ({ item, handleClick, handleAddToWishlist, handleClick2, handleSelectedCart, handleSelectedWish }) => {
  const {disabled_Cart, disabled_Wish } = item;
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishList, setAddedToWishList] = useState(false);

  const handleAddToCart = () => {
    handleClick(item);
    setAddedToCart(true);
    handleSelectedCart(item.productId);
    toast.success(`Added to cart successfully!`, { autoClose: 600 });
  };

  const handleWishlistClick = () => {
    handleClick2(item);
    setAddedToWishList(true);
    handleSelectedWish(item.productId);
    toast.info(`Added to wishlist!`, { autoClose: 600 });
  };
  // console.log(item);
  return (
    <div className="col-30 col-md-40 col-lg-9 mx-0 mb-4 d-flex flex-column">
      <div className="card p-0 overflow-hidden shadow">
        <img src={item?.imageUrl} className="card-img-top img-fluid img-center" alt="" />
        <div className="card-body text-center">
          <h5 className="card-title">{item?.productName}</h5>
          <p className="card-text">Price: ₹{item?.productPrice}</p>
          <button className="btn btn-success" onClick={handleAddToCart} disabled={disabled_Cart}>
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
          <br /><br/>
          &nbsp;
          <button className="btn btn-outline-secondary" onClick={handleWishlistClick} disabled={disabled_Wish}>
            {addedToWishList ? "Wish Listed" : "Add to Wishlist" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
