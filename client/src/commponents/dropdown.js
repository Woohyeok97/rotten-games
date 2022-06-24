import React, { useState } from 'react';

import '../css/dropdown.scss'

function Dropdown(props) {
    return(
      <div className="dropdown-container">
        <input id={"dropdown" + props.id} className="in" type="checkbox"/>
        <label className="dropdown-label" for={"dropdown" + props.id}>
          <div>{ props.value }</div>
          <div className="dropdown-icon">▾</div> 
        </label>
        <div className="content">
        { props.children }
        </div>
      </div>
    )
  }

export default Dropdown;