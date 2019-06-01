import React from 'react';
import './input.css';
import { DragSource } from 'react-dnd'
import { ElementTypes } from '../../../constants'

function Input({ isDragging, dragSource, position = [0, 0], id, isNew }) {
    return dragSource(
        <input className={isDragging ? "input is-dragging" : "input"}
            placeholder="Input"
            style={{ position: isNew ? "relative" : "absolute", left: position[0], top: position[1] }}
        />
    );
}

// Setup DND Source
const elementSource = {
    beginDrag: props => ({ id: props.id, isNew: props.isNew, type: ElementTypes.INPUT }),
}

function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
export default DragSource(ElementTypes.INPUT, elementSource, collect)(Input)
