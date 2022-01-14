import loginService from "../services/login";
import { notificationChange } from "./notificationReducer";

const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
let user = JSON.parse(loggedUserJSON);

//const initialState = loggedUserJSON ? loggedUserJSON : null;
const initialState = loggedUserJSON ? user : null;

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return action.data;
    default:
      return state;
  }
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      dispatch({
        type: "LOGIN",
        //data: { user },
        data: JSON.parse(window.localStorage.getItem("loggedBlogappUser")),
      });
    } catch (e) {
      dispatch(notificationChange("wrong username or password", "error"));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear();

    dispatch({
      type: "LOGOUT",
      data: null,
    });
  };
};

export default loginReducer;
