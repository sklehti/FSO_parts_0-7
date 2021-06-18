import React from "react";

const Filter = (props) => {
  const { showPerson, handleShowPerson } = props;

  return (
    <div>
      filter shown with
      <input value={showPerson} onChange={handleShowPerson} />
    </div>
  );
};

export default Filter;
