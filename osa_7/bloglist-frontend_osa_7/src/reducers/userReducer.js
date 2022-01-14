const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = (b) => {
  return {
    type: "INIT_USER",
    data: b,
  };
};

export default userReducer;
