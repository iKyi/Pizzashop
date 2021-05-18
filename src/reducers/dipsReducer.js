const sstate = (state = [], action) => {
  switch (action.type) {
    case "FETCH_DIPS":
      return action.payload;
    default:
      return state;
  }
};

export default sstate;