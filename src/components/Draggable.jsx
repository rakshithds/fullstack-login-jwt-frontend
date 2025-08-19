import { useDraggable } from "@dnd-kit/core";
import React from "react";

const Draggable = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    padding: "20px",
    background: "skyblue",
    cursor: "grab",
    width: "100px",
    textAllign: "center",
    marginTop: "10px",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
};

export default Draggable;
