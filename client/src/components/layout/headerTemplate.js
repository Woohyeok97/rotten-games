import React from "react";

//CSS
import styles from '../../styles/layout/headerTemplate.module.scss'

function HeaderTemplate({children}) {
  return (
    <section className={styles.template}>
    {children}
    </section>
  )
}



export default HeaderTemplate