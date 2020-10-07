export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_PIZZAS":
        return action.payload;
      case "FETCH_BY_TYPE":
        return action.payload
      default:
        return state;
    }
  };
  