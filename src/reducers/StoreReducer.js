export default (state = null, action) => {
    switch (action.type) {
      case "SET_STORE":
        return action.payload;
      default:
        return state;
    }
  };
  