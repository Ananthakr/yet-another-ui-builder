import React from 'react';
import './text.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Text({ isDragging, dragSource, position = [0, 0], id, isNew }) {
  return dragSource(
    <p className={isDragging ? "text is-dragging" : "text"}
      style={{ position: isNew ? "relative" : "absolute", left: position[0], top: position[1] }}
    >
      Text
    </p>,
  );
}

// Setup DND Source
const elementSource = {
  beginDrag: props => ({ id: props.id, isNew: props.isNew, type:ElementTypes.TEXT }),
}

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource(ElementTypes.TEXT, elementSource, collect)(Text)
