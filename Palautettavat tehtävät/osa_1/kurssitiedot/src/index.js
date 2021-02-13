import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.os[0].name} {props.os[0].exercises}
      </p>
      <p>
        {props.os[1].name} {props.os[1].exercises}
      </p>
      <p>
        {props.os[2].name} {props.os[2].exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part os={props.osat} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.harj[0].exercises +
          props.harj[1].exercises +
          props.harj[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass  data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header kurssi={course.name} />
      <Content osat={course.parts} />
      <Total harj={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
