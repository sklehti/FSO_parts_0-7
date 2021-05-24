import React, { useState } from "react";
import ReactDOM from "react-dom";
//import "./index.css";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statisticline = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const all = good + bad + neutral;
  const average = (good - bad) / (good + bad + neutral);
  const positive = (good / (good + bad + neutral)) * 100 + "%";

  return (
    <table>
      <tbody>
        <Statisticline text="good" value={good} />
        <Statisticline text="neutral" value={neutral} />
        <Statisticline text="bad" value={bad} />
        <Statisticline text="all" value={all} />
        <Statisticline text="average" value={average} />
        <Statisticline text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = (props) => {
  //huom, napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <h2>statistics</h2>
        <a>No feedback given</a>
      </div>
    );
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + bad + neutral}
        average={(good - bad) / (good + bad + neutral)}
        positive={good / (good + bad + neutral)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
