/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
*/

import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
/*
export const voteOf = (id) => {
  //console.log("vote", id);
  return {
    type: "ADD_VOTE",
    data: { id },
  };
};
*/

export const voteOf = (id, anecdote) => {
  return async (dispatch) => {
    const updateObject = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const updateAnecdote = await anecdoteService.update(id, updateObject);
    dispatch({
      type: "ADD_VOTE",
      data: updateAnecdote,
    });
  };
};

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
*/

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = [], action) => {
  //console.log("state now: ", state);
  //console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    case "ADD_VOTE":
      const id = action.data.id;
      const voteToAdd = state.find((v) => v.id === id);

      const addVote = {
        ...voteToAdd,
        votes: voteToAdd.votes + 1,
      };

      var byVotes = state.map((v) => (v.id !== id ? v : addVote));

      byVotes.sort(function (a, b) {
        return b.votes - a.votes;
      });

      return byVotes;

    //return state.map((v) => (v.id !== id ? v : addVote));
    default:
      return state;
  }

  //return state;
};

export default anecdoteReducer;
