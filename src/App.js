import React, { useEffect, useState } from "react";
import Amazon from "./components/amazon";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from "./components/wishlist";
import Products from "./services/product-service";
import Carts from "./services/cart-service";
import WishList from "./services/wishList-service";

const App = () => {
  const [show, setShow] = useState(true);
  const [showCartOrWish, setShowCartOrWish] = useState(true);
  const [selectedCart, setSelectedCart] = useState([]);
  const [selectedWish, setSelectedWish] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await Products.getAllProducts();
      setProducts(products?.data);
      console.log(products)
    })();
  }, []);

  const handleSelectedCart = (itemId) =>{
    console.log(itemId);
    console.log(selectedWish);
    setSelectedCart([...selectedCart, itemId])
  }
  const handleSelectedWish = (itemId) =>{
    console.log(itemId);
    console.log(selectedCart);
    setSelectedWish([...selectedWish, itemId])
  }
  
  let upatedList = products?.map((item) => {
    if(selectedCart.includes(item.id)){
      return {...item, disabled_Cart: true, amount:1}
    }else{
      return {...item, amount:1}
    }
  }).map((item) => {
    if(selectedWish.includes(item.id)){
      return {...item, disabled_Wish: true, amount:1}
    }else{
      return {...item, amount:1};
    }
  });
  const handleClick = (item) => {
    console.log("App.js", item);
    let req = {
      "productCount": 1,
      "productId": [
        item.productId
      ],
      "totalPrice": item.productPrice
    }
    Carts.addToCart(req).then((data)=>{
      console.log("Success", data);
    });
    
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };
  const handleClick2 = (item) => {
    let req = {
      "totalPrice": item.productPrice,
      "wishlistId": item.productId 
    }
    WishList.addToWishList(req).then((data)=>{
      console.log("Success Wishlist", data);
    });
    // if (wishlist.indexOf(item) !== -1) return;
    // setWishlist([...wishlist, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;
    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Navbar setShow={setShow} setShowCartOrWish={setShowCartOrWish} size={cart.length} sizeWishList={wishlist.length} />
      {show ? (
        <Amazon handleClick={handleClick} handleClick2={handleClick2} upatedList={upatedList} handleSelectedCart={handleSelectedCart}
          handleSelectedWish={handleSelectedWish}
        />
      ) : showCartOrWish ? (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      ) : <Wishlist wishlist={wishlist} setWishlist={setWishlist} handleChange={handleChange} />
      }
    </>
  );
};

export default App;