import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";
import { notificationOf } from "../reducers/notificationReducer";

const Votes = ({ anecdote, vote }) => {
  const style = {
    marginLeft: 5,
  };

  return (
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)} style={style}>
        vote
      </button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(voteOf(anecdote.id, anecdote));
    dispatch(notificationOf(`you voted '${anecdote.content}' `, 5));
  };

  const filterAnecdotes =
    anecdotes.content !== ""
      ? anecdotes
          .filter(
            (a) => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
          )
          .sort((a, b) => {
            return b.votes - a.votes;
          })
      : anecdotes;

  console.log(filterAnecdotes);

  return (
    <div>
      <br />

      {filterAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <Votes vote={vote} anecdote={anecdote} />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
