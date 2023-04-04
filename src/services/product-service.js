
// import list from "./data";
// const PRODUCTS_DATA = list;
import axios from "axios";

const GET_ALL_PRODUCTS = 'http://localhost:8082/product/getallproducts';
const GET_PRODUCT_BY_ID = 'http://localhost:8082/product/getbyid';
// const GET_PRODUCTS_BY_CATEGORY = 'http://localhost:8080/lms/emp';

class ProductService {
  getAllProducts() {
    return axios.get(GET_ALL_PRODUCTS);
  }

  getProductById(prodId) {
    return axios.get(GET_PRODUCT_BY_ID + "/" + prodId);
  }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();