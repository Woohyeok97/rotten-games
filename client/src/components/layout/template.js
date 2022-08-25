import React from "react";

//CSS
import styles from '../../styles/layout/template.module.scss'

function Template({children}) {
  return (
    <section className={styles.template}>
    {children}
    </section>
  )
}



export default Template