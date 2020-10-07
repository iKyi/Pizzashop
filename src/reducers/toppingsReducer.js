export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_TOPPINGS":
        return action.payload;
      default:
        return state;
    }
  };
  