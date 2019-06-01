import React from 'react';
import './text.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Text({ isDragging, dragSource, position = [0, 0], id, isNew }) {
  return dragSource(
    <div className={isNew ? "" : "bounding-box"} style={{ position: isNew ? "relative" : "absolute", left: position[0], top: position[1], display: isDragging ? "none" : "block" }}>
      <p className={isDragging ? "text is-dragging" : "text"}>
        Text
      </p>
    </div>,
  );
}

// Setup DND Source
const elementSource = {
  beginDrag: props => ({ id: props.id, isNew: props.isNew, type: ElementTypes.TEXT }),
}

function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
export default DragSource(ElementTypes.TEXT, elementSource, collect)(Text)
