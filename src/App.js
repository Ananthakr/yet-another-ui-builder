import React, { useState, useEffect } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import Board from './components/board';
import Elements from './components/elements';

// Setup state
const INITIAL_STATE = {
  elements: [
    {
      id: 0,
      position: [0, 0]
    },
    {
      id: 1,
      position: [0, 0]
    },
    {
      id: 2,
      position: [0, 0]
    }
  ]
}
export const StateContext = React.createContext(INITIAL_STATE);



function App() {

  // Create State
  const [state, setState] = useState(localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : INITIAL_STATE)

  // Save Data on change
  useEffect(() => {

    localStorage.setItem('appState', JSON.stringify(state));
  })


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
    <StateContext.Provider value={{ ...state }}>
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <Board moveElement={moveElement} elementIndex={0}>
            {renderElements()}
          </Board>
        </div>
      </DragDropContextProvider>
    </StateContext.Provider>
  );
}

export default App;
