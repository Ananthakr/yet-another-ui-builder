import React from 'react';
import './settings.css';

function Settings({ autoSave, toggleAutoSave, saveState, resetState }) {
    return (
        <div className="settings-bar">

            <button className="settings-button" onClick={resetState}>
                Reset
            </button>
            {
                !autoSave && <button className="settings-button" onClick={saveState}>
                    Save
            </button>
            }
            <div className="checkbox">
                <input id="autoSave" type="checkbox" checked={autoSave} onClick={toggleAutoSave} />
                <label for="autoSave">Auto Save</label>
            </div>



        </div>
    );
}

export default Settings;
