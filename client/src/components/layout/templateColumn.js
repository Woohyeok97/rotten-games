import React from "react";

import styles from '../../styles/layout/templateColumn.module.scss'

function TemplateColumn({children}) {
  return (
    <section className={styles.template}>
    {children}
    </section>
  )
}



export default TemplateColumn