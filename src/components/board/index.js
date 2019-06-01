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
        const type = item.type;
        console.log("dropped",item)
        if (item.isNew) {
            props.addElement({ position, type });
        } else {
            const elementIndex = item.id;
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

export default DropTarget(Object.values(ElementTypes), boardTarget, collect)(Board);
