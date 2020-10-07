export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_SECTIONS":
        return action.payload;
       
      default:
        return state;
    }
  };
  