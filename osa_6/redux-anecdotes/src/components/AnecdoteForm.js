import React from "react";
import { connect, useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notificationOf } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.createAnecdote(content);
    props.notificationOf(`you create new anecdote '${content}' `, 5);
  };

  const style = {
    marginTop: 5,
  };

  return (
    <div>
      <div>
        <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div>
              <input name="anecdote" />
            </div>
            <button type="submit" style={style}>
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createAnecdote, notificationOf })(AnecdoteForm);
