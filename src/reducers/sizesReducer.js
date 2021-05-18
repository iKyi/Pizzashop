const sstate = (state = [], action) => {
  switch (action.type) {
    case "FETCH_SIZES":
      return action.payload;
    default:
      return state;
  }
};

export default sstate;