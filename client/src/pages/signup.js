/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

// CSS
import styles from '../styles/pages/signup.module.scss'
//Common Components
import NullComponent from '../components/nullcomponent';

function SignUp() {
  return(
    <section className={ styles.signup }>
      <NullComponent/>
    </section>
  )
}

export default SignUp