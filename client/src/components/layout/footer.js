import React from "react";

//CSS
import styles from '../../styles/layout/footer.module.scss'

function Footer() {
  return(
    <footer className={styles.footer}>
      <div style={{ border : '1px solid #515163' }}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>안녕하세요. 저는 Footer 입니다. 그럼 20000</h2>
      </div>
    </footer>
  )
}

export default Footer