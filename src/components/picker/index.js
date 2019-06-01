import React from 'react';
import './picker.css';
import Elements from '../elements/';

function Picker() {
    return (
        <div className="picker-bar">
            <Elements.Button  isNew={true}/>
            <Elements.Text  isNew={true}/>
            <Elements.Input  isNew={true}/>
        </div>
    );
}

export default Picker;
