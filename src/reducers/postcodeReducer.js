export default (state = [], action) => {
    switch (action.type) {
      case "GET_POSTCODE":
        return action.payload;
      default:
        return state;
    }
  };
  