import React from "react";

const Persons = ({ p, handlePersonDelete }) => {
  //console.log(p.name, p.number, "numero");
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
