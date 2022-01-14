import { useState } from "react";

export const useCreateNew = (name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClick = () => {
    setValue("");
  };

  return {
    name,
    value,
    onChange,
    onClick,
  };
};
