import React from "react";

const AddButton = ({ className, text, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {text ? text : "Click"}
    </button>
  );
};

export default AddButton;
