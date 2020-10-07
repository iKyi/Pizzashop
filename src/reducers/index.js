import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import toppingsReducer from "./toppingsReducer";
import sizesReducer from "./sizesReducer";
import dipsReducer from "./dipsReducer";
import crustsReducer from "./crustsReducer";
/// def starts here
export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  toppings: toppingsReducer,
  sizes: sizesReducer,
  dips: dipsReducer,
  crusts: crustsReducer,
});
