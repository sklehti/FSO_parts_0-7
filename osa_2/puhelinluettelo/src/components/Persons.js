import React from "react";

const Persons = ({ p, handlePersonDelete }) => {
  return (
    <div>
      <div>
        {p.name} {p.number}
        <button value={p} onClick={handlePersonDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Persons;
