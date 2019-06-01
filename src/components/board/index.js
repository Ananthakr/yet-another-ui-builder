import React from 'react';
import './board.css';
import { DropTarget } from 'react-dnd'
import { ElementTypes } from '../../constants';


function Board({ dropTarget, isOver, children }) {
    return dropTarget(
        <div className="board">
            {children}
        </div>
    );
}

// Setup DND Drop
const boardTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const clientOffset = monitor.getClientOffset();
        const position = [clientOffset.x, clientOffset.y];

        if (item.isNew) {
            props.addElement({ position });
        } else {

            const elementIndex = item.id;

            // const delta = monitor.getDifferenceFromInitialOffset();
            // const left = Math.round(item.left + delta.x);
            // const top = Math.round(item.top + delta.y);
            // const position = [left, top];

            props.moveElement({ position, elementIndex })
        }

    },
}

function collect(connect, monitor) {
    return {
        dropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

export default DropTarget(ElementTypes.BUTTON, boardTarget, collect)(Board);
