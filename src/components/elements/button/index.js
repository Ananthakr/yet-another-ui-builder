import React from 'react';
import './button.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Button({ isDragging, dragSource, position = [0, 0], id, isNew }) {
  return dragSource(
    <button className={isDragging ? "button is-dragging" : "button"}
      style={{ position: isNew ? "relative" : "absolute", left: position[0], top: position[1] }}
    >
      Button
    </button>,
  );
}

// Setup DND Source
const buttonSource = {
  beginDrag: props => ({ id: props.id, isNew: props.isNew }),
}

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource(ElementTypes.BUTTON, buttonSource, collect)(Button)
