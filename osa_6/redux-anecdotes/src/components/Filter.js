import React from "react";
import { filterReducerOf } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterReducerOf(event.target.value);
  };
  const style = {
    marginBotton: 10,
    marginTop: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterReducerOf })(Filter);
