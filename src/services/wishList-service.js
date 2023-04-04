import axios from "axios";

const GET_WISH_LIST = 'http://localhost:8082/wishlist/getAllWishlist';
const ADD_TO_WISH_LIST = 'http://localhost:8082/wishlist/addWishlist';
const DEL_BY_WISH_LIST_ID = "http://localhost:8082/wishlist/deleteById";

class CartService {

  addToWishList(wishListData) {
    return axios.post(ADD_TO_WISH_LIST,wishListData);
  }

  getWishList() {
    return axios.get(GET_WISH_LIST);
  }

  deleteByWishList(wishListId) {
    return axios.delete(DEL_BY_WISH_LIST_ID + "/" + wishListId);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService();