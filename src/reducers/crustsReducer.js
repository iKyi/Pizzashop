export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_CRUSTS":
        return action.payload;
      default:
        return state;
    }
  };
  