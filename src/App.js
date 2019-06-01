import React, { useState, useEffect } from 'react';
import DragAndDropContext from './dragAndDropContext';
import './App.css';
import Board from './components/board';
import Elements from './components/elements';
import Settings from './components/settings';
import Picker from './components/picker';
import { isTouchScreen } from './utils';

// Setup state
const INITIAL_STATE = {
  elements: [],
  autoSave: false
}
export const StateContext = React.createContext(INITIAL_STATE);


const DragAndDropContextProvider = props => {
  if (props.isTouch) {
    return <DragAndDropContext.Touch>{props.children}</DragAndDropContext.Touch>
  } else {
    return <DragAndDropContext.HTML5>{props.children}</DragAndDropContext.HTML5>
  }
};


function App() {

  // Create State
  const [state, setState] = useState(localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : INITIAL_STATE)

  // Save Data on change
  useEffect(() => {
    if (state.autoSave)
      saveState();
  })

  const resetState = () => {
    console.log("Resetting state")
    setState(INITIAL_STATE);
  }

  const saveState = () => {
    console.log("Saving state")
    localStorage.setItem('appState', JSON.stringify(state));
  }

  const toggleAutoSave = () => {
    console.log("Toggling auto save");
    setState({
      ...state,
      autoSave: !state.autoSave
    })
  }





  // move dragged element
  const moveElement = ({ position, elementIndex }) => {
    // console.log("move element",state);
    setState({
      ...state,
      elements: state.elements.map((element, index) => {
        return index === elementIndex ? { ...element, position } : element
      })
    }
    )
  }

  // add dragged element
  const addElement = ({ position }) => {
    console.log("Add new element", position);
    setState({
      ...state,
      elements: [...state.elements, {
        id: state.elements.length,
        position: position,
        isNew: false
      }]
    })
  }


  // Render elements from State
  const renderElements = () => {

    return (
      <>
        {
          state.elements.map((element, index) => {
            return <Elements.Button position={element.position} id={element.id} key={element.id} isNew={false} />
          })
        }
      </>
    )

  }

  return (
    <div className="app">
      <Settings resetState={resetState} saveState={saveState} autoSave={state.autoSave} toggleAutoSave={toggleAutoSave} />
      <div className="container">
        <StateContext.Provider value={{ ...state }}>
          <DragAndDropContextProvider isTouch={isTouchScreen()}>
            <Picker />
            <Board addElement={addElement} moveElement={moveElement} >
              {renderElements()}
            </Board>

          </DragAndDropContextProvider>
        </StateContext.Provider>
      </div>
    </div>
  );
}

export default App;
