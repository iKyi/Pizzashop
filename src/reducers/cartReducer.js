import _ from "lodash";
export default (state = [], action) => {
  switch (action.type) {
    case "SET_CART_INIT":
      const cart = action.payload;
      return cart;
    case "ADD_CART":
      var product = action.payload;
      var newState = _.cloneDeep(state);
      var existing = newState.find((item) => item.id === product.id);
      if (!existing) {
        newState.push(product);
      } else {
        existing.amount++;
        existing.price = (existing.singlePrice * existing.amount).toFixed(2);
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case "REMOVE_CART":
      product = action.payload;
      newState = _.cloneDeep(state);
      existing = newState.find((item) => item.id === product.id);
      if (existing && existing.amount >= 2) {
        existing.amount -= 1;
        existing.price = (existing.singlePrice * existing.amount).toFixed(2);
      } else if (existing && existing.amount === 1) {
        newState = newState.filter((item) => item.id !== existing.id);
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
