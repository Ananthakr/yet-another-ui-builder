import React, { useState, useEffect } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend'
import './App.css';
import Board from './components/board';
import Elements from './components/elements';
import Settings from './components/settings';
import { isTouchScreen } from './utils';

// Setup state
const INITIAL_STATE = {
  elements: [
    {
      id: 0,
      position: [200, 200]
    },
    {
      id: 1,
      position: [200, 200]
    },
    {
      id: 2,
      position: [200, 200]
    }
  ]
}
export const StateContext = React.createContext(INITIAL_STATE);



function App() {

  // Create State
  const [state, setState] = useState(localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : INITIAL_STATE)

  // Save Data on change
  useEffect(() => {
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





  // move dragged element
  const moveElement = ({ position, elementIndex }) => {
    // console.log("move element",position);
    setState({
      ...state.elements,
      elements: state.elements.map((element, index) => {
        return index === elementIndex ? { ...element, position } : element
      })
    }
    )
  }


  // Render elements from State
  const renderElements = () => {

    return (
      <>
        {
          state.elements.map((element, index) => {
            return <Elements.Button position={element.position} id={element.id} key={element.id} />
          })
        }
      </>
    )

  }

  return (
    <div className="App">
      <Settings resetState={resetState} saveState={saveState} />
      <StateContext.Provider value={{ ...state }}>
        <DragDropContextProvider backend={isTouchScreen() ? TouchBackend : HTML5Backend}>


          <Board moveElement={moveElement} elementIndex={0}>
            {renderElements()}
          </Board>

        </DragDropContextProvider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
