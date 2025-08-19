import { useDroppable } from "@dnd-kit/core";
import React from "react";

const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    height: "350px",
    width: "200px",
    border: "2px dashed gray",
    background: isOver ? "lightgreen" : "white",
    padding: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h4>{id}</h4>
      {children}
    </div>
  );
};

export default Droppable;
