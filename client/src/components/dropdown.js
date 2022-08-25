import React, { useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
//CSS
import styles from '../styles/components/dropdown.module.scss'

function Dropdown({ children, state, setState, id }) {

  const classNames = {
    enter : styles.enter,
    enterActive : styles.enterActive,
    exit : styles.exit,
    exitActive : styles.exitActive
  }

  return(
    <div className={ styles.dropdown }>
      <input id={id} className={ styles.state }
      onClick={()=>{ setState(!state) }} type="checkbox"/>
      <label for={id} className={styles.label}>
        <span >이미지 정보</span>
        <span className={styles.icon}>
        </span>
      </label>
      <CSSTransition in={state} classNames={classNames} timeout={500}>
       { children }
      </CSSTransition>
    </div>
  )
}


export default Dropdown;