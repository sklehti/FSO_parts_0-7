import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import anecdoteReducer, {
  initializeAnecdotes,
} from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
