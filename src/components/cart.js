import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Carts from "../services/cart-service";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item?.products?.[0]?.productPrice));
    setPrice(ans);
  };

  useEffect(() => {
    async function fetchCart() {
      const cartData = await Carts.getAllCart();
      // setCart(cartData?.data);
      // setLoading(false);
      let upatedList = await cartData?.data.map((item) => { return {...item, amount:1} });
      setCart(upatedList);
    }
    fetchCart();
    console.log(cart)
  }, []);

  useEffect(() => {
    handlePrice();
    console.log("cart.js");
    // console.log(cart)
  },[cart, price]);

  const uniqueItems = new Set(cart.map((item) => item?.products?.[0]?.productId));
  const numUniqueItems = uniqueItems.size;
  const numTotalItems = cart.reduce((acc, item) => acc + item.amount, 0);

  const handleEmptyCart = () => {
    setCart([]);
    setPrice(0);
  };

  return (
    <section className="cart_box">
      <div className="row justify-content-center">
        <div className="col-12">
          {cart.length > 0 && (
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h4 className="mb-0">Cart({numUniqueItems}) total items({numTotalItems})</h4>
              </div>
              <div>
                <button className="btn btn-success btn-sm" onClick={handleEmptyCart}>
                  Empty Cart
                </button>
              </div>
            </div>
          )}
          <table className="table table-light table-hover m-5 w-100">
            <tbody>
              {cart?.map((item) => {
                return (
                  <tr key={item?.products?.[0]?.productId}>
                    <td>
                      <img
                        src={item?.products?.[0]?.imageUrl}
                        style={{ height: "8rem", width: "8rem" }}
                        alt="img"
                      ></img>
                    </td>
                    <td>{item?.products?.[0]?.productName}</td>
                    <td>₹{item?.products?.[0]?.productPrice}</td>
                    <td>
                      <div className="btn-group " role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={() => handleChange(item, -1)}>-</button>
                        <button type="button" className="btn btn-secondary">{item.amount}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleChange(item, 1)}>+</button>
                      </div>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleRemove(item?.products?.[0]?.productId)}
                      >
                        removeItem
                      </button>
                    </td>
                    <td className="text-danger">₹{item?.amount * item?.products?.[0]?.productPrice}</td>
                  </tr>
                );
              })}
              {cart.length === 0 && (
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img src="https://i.imgur.com/dCdflKN.png" alt="img" style={{ width: "100px", height: "100px" }} className="img-fluid mb-4 mr-3" />
                  <h3><strong>Your Cart is Empty</strong></h3>
                  <h4>Add something to make me happy :)</h4>
                  <a href="/card" className="btn btn-primary cart-btn-transform m-3" data-abc="true" style={{ color: "black" }}>continue shopping</a>
                </div>
              )}
            </tbody>
          </table>
          {cart.length > 0 && (
            <div className="col-auto ms-auto">
              <h2>Total Price: ₹{price}</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
