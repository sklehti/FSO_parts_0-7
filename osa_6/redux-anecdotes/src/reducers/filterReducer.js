const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_ANECDOTE":
      return action.data;
    default:
      return state;
  }
};

export const filterReducerOf = (filter) => {
  return {
    type: "FILTER_ANECDOTE",
    data: filter,
  };
};

export default filterReducer;
