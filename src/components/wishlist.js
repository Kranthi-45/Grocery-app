import React, { useEffect, useState } from "react";
import WishList from "../services/wishList-service";
import Product from "../services/product-service";


const Wishlist = ({ wishlist, setWishlist }) => {
  const [loading, setLoading] = useState(true);

  const handleRemoveFromWishlist = (id) => {
    const arr = wishlist?.filter((item) => item?.productId !== id);
    WishList.deleteByWishList(id).then((resp) => {
      console.log(resp, "Removed Successfully")
    })
    setWishlist(arr);
  };

  useEffect(() => {
    async function fetchWishlist() {
      const wishlistData = await WishList.getWishList();
      setWishlist(wishlistData?.data);
      setLoading(false);
    }
    fetchWishlist();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const updatedList = await Promise.all(
        wishlist.map((item) =>
          Product.getProductById(item?.wishlistId).then((resp) => resp.data)
        )
      );
      setWishlist(updatedList);
    }
    if (!loading) {
      fetchProducts();
    }
  }, [wishlist, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="wishlist_box">
      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-light table-hover m-5 w-100">
            <tbody>
              {wishlist?.map((item) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={item.imageUrl}
                        style={{ height: "8rem", width: "8rem" }}
                        alt="img"
                      ></img>
                    </td>
                    <td>{item.productName}</td>
                    <td>₹{item.productPrice}</td>
                    <td>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleRemoveFromWishlist(item.productId)}
                      >
                        Remove Item
                      </button>
                      {/* <button
                        className="btn btn-dark ms-2"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to cart
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div>
        <span>Total Wishlist Items: </span>
        <span>{wishlist.length}</span>
      </div> */}
    </section>
  );
};

export default Wishlist;
