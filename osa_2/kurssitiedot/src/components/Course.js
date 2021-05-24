import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((p) => (
        <Part key={p.id} part={p.name} exercises={p.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return <h3>total of {props.sum} exercises </h3>;
};

const Course = ({ courses }) => {
  const sum = courses.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <Header course={courses.name} />
      <Content parts={courses.parts} />

      <Total sum={sum} />
    </div>
  );
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

export default Course;
