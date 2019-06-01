import React from 'react';
import './button.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Button({ isDragging, dragSource, position = [0, 0], id, isNew }) {
  return dragSource(
    <div className={isNew ? "" : "bounding-box"} style={{ position: isNew ? "relative" : "absolute", left: position[0], top: position[1], display: isDragging? "none": "block" }}>
      <button className={isDragging ? "button is-dragging" : "button"}>
        Button
      </button>
    </div>,
  );
}

// Setup DND Source
const elementSource = {
  beginDrag: props => ({ id: props.id, isNew: props.isNew, type: ElementTypes.BUTTON }),
}

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource(ElementTypes.BUTTON, elementSource, collect)(Button)
