import React, { useState, useEffect } from "react";
import DragAndDropContext from "./dragAndDropContext";
import "./App.css";
import Board from "./components/board";
import Elements from "./components/elements";
import Settings from "./components/settings";
import Picker from "./components/picker";
import { isTouchScreen } from "./utils";
import { ElementTypes } from "./constants";
import { throwError } from "rxjs";

// Setup state
const INITIAL_STATE = {
  ELEMENTS: [],
  SETTINGS: { autoSave: false, snapToGrid: false }
};
export const ElementsContext = React.createContext(INITIAL_STATE.ELEMENTS);
export const SettingsContext = React.createContext(INITIAL_STATE.SETTINGS);

const DragAndDropContextProvider = props => {
  if (props.isTouch) {
    return (
      <DragAndDropContext.Touch>{props.children}</DragAndDropContext.Touch>
    );
  } else {
    return (
      <DragAndDropContext.HTML5>{props.children}</DragAndDropContext.HTML5>
    );
  }
};

function App() {
  // Create States
  const [elements, setElements] = useState(
    localStorage.getItem("elementsState")
      ? JSON.parse(localStorage.getItem("elementsState"))
      : INITIAL_STATE.ELEMENTS
  );

  const [settings, setSettings] = useState(
    localStorage.getItem("settingsState")
      ? JSON.parse(localStorage.getItem("settingsState"))
      : INITIAL_STATE.SETTINGS
  );

  // Save Data on change
  useEffect(() => {
    if (settings.autoSave) {
      saveElements();
    }
  }, [elements, settings.autoSave]);

  useEffect(() => {
    console.log("Saving settings");
    localStorage.setItem("settingsState", JSON.stringify(settings));
  }, [settings]);

  // Settings actions
  const resetElements = () => {
    console.log("Resetting board");
    setElements(INITIAL_STATE.ELEMENTS);
  };

  const saveElements = () => {
    console.log("Saving board");
    localStorage.setItem("elementsState", JSON.stringify(elements));
  };

  const toggleAutoSave = () => {
    console.log("Toggling auto save");
    setSettings({
      ...settings,
      autoSave: !settings.autoSave
    });
  };

  const toggleSnapToGrid = () => {
    console.log("Toggling snap to grid");
    setSettings({
      ...settings,
      snapToGrid: !settings.snapToGrid
    });
  };

  // move dragged element
  const moveElement = ({ position, elementIndex }) => {
    // console.log("move element",state);
    setElements(
      elements.map((element, index) => {
        return index === elementIndex ? { ...element, position } : element;
      })
    );
  };

  // add dragged element
  const addElement = ({ position, type }) => {
    console.log("Add new element of type", type);
    setElements([
      ...elements,
      {
        id: elements.length,
        position: position,
        isNew: false,
        type: type
      }
    ]);
  };

  // Render elements from State
  const renderElements = () => {
    return (
      <>
        {elements.map((element, index) => {
          if (element.type === ElementTypes.BUTTON) {
            return (
              <Elements.Button
                position={element.position}
                id={element.id}
                key={element.id}
                isNew={element.isNew}
                type={element.type}
              />
            );
          } else if (element.type === ElementTypes.TEXT) {
            return (
              <Elements.Text
                position={element.position}
                id={element.id}
                key={element.id}
                isNew={element.isNew}
                type={element.type}
              />
            );
          } else if (element.type === ElementTypes.INPUT) {
            return (
              <Elements.Input
                position={element.position}
                id={element.id}
                key={element.id}
                isNew={element.isNew}
                type={element.type}
              />
            );
          } else {
            throwError("Invalid element dropped");
            return null;
          }
        })}
      </>
    );
  };

  return (
    <div className="app">
      <Settings
        resetElements={resetElements}
        saveElements={saveElements}
        autoSave={settings.autoSave}
        toggleAutoSave={toggleAutoSave}
        snapToGrid={settings.snapToGrid}
        toggleSnapToGrid={toggleSnapToGrid}
      />
      <div className="container">
        <ElementsContext.Provider value={{ ...elements }}>
          <SettingsContext.Provider value={{ ...settings }}>
            <DragAndDropContextProvider isTouch={isTouchScreen()}>
              <Picker />
              <Board addElement={addElement} moveElement={moveElement}>
                {renderElements()}
              </Board>
            </DragAndDropContextProvider>
          </SettingsContext.Provider>
        </ElementsContext.Provider>
      </div>
    </div>
  );
}

export default App;
