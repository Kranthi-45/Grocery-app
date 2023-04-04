import axios from "axios";

const GET_ALL_CART = "http://localhost:8082/cart/get-all-cart";
const ADD_TO_CART = 'http://localhost:8082/cart/add-cart';

class CartService {

  addToCart(cartData) {
    return axios.post(ADD_TO_CART, cartData);
  }

  getAllCart() {
    return axios.get(GET_ALL_CART);
  }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService();