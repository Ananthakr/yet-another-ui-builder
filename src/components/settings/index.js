import React from 'react';
import './settings.css';

function Settings({ saveState, resetState }) {
    return (
        <div className="settings-bar">
            <button className="settings-button" onClick={resetState}>
                Reset
            </button>
            <button className="settings-button" onClick={saveState}>
                Save
            </button>
        </div>
    );
}

export default Settings;
