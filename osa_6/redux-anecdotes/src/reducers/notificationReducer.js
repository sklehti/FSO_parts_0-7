const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};
/*
export const notificationOf = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    data: notification,
  };
};
*/
let timer;

export const notificationOf = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });

    clearTimeout(timer);

    timer = setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    }, time * 1000);
  };
};

export const removeNotificationOf = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default notificationReducer;
