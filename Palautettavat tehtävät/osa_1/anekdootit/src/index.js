import React, { useState } from "react";
import ReactDOM from "react-dom";

const points = Array(6).fill(0);
const copy = [...points];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([]);
  let biggest = 0;

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6));
  };
  const voteClick = () => {
    setVote((copy[selected] += 1));
    console.log(copy);
    console.log(Math.max(...copy));
    console.log(copy.indexOf(Math.max(...copy)));
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br />
      has {copy[selected]} votes
      <br />
      <button onClick={voteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdotes with most votes</h2>
      {props.anecdotes[copy.indexOf(Math.max(...copy))]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
