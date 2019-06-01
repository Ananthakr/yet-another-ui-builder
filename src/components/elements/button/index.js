import React from 'react';
import './button.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Button({ isDragging, dragSource, position, id }) {
  return dragSource(
    <button className="button"
      style={{ position: "absolute", left: position[0], top: position[1] }}
    >
      {isDragging ? "Help me!" : "Button"}
    </button>,
  );
}

// Setup DND Source
const buttonSource = {
  beginDrag: props => ({ id: props.id }),
}

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource(ElementTypes.BUTTON, buttonSource, collect)(Button)
