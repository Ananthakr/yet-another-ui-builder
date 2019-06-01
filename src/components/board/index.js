import React from 'react';
import './board.css';
import { DropTarget } from 'react-dnd'
import { ElementTypes } from '../../constants';
import { snapToGrid } from '../../utils';


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
        const clientOffset = monitor.getSourceClientOffset();

        const position = props.snapToGrid ? snapToGrid(clientOffset.x, clientOffset.y) : [clientOffset.x, clientOffset.y];
        const type = item.type;

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
