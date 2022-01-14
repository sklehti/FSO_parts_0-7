const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

let timer;

export const notificationChange = (notification, style) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: [notification, style],
    });

    clearTimeout(timer);

    timer = setTimeout(() => {
      dispatch(notificationRemove());
    }, 5000);
  };
};

export const notificationRemove = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: "",
  };
};

export default notificationReducer;
