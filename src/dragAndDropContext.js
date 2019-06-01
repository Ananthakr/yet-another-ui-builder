// Wrapper to avoid double backend issue
// https://github.com/react-dnd/react-dnd/issues/186#issuecomment-490659169

import React from 'react';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";

const DragAndDropHOC = props => {
    return <React.Fragment>
        {props.children}
    </React.Fragment>
};

export default {
    HTML5: DragDropContext(HTML5Backend)(DragAndDropHOC),
    Touch: DragDropContext(TouchBackend)(DragAndDropHOC),
}
