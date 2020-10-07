import _ from "lodash";
export default (state = [], action) => {
  switch (action.type) {
    case "ADD_CART":
      var product = action.payload;
      var newState = _.cloneDeep(state);
      var existing = newState.find(item => item.id === product.id);
      if (existing === undefined) {
        product.amount = 1;
        newState.push(product);
      } else {
        existing.amount += 1;
      }
      return newState;
    case "REMOVE_CART":
      product = action.payload;
      newState = _.cloneDeep(state);
      existing = newState.find(item => item.id === product.id);
      if (existing.amount >= 2) {
        existing.amount -= 1
      } else if (existing.amount === 1) {
        newState = newState.filter(item => item.id !== existing.id);
      }
      return newState;
    default:
      return state;
  }
};
