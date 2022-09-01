import React from "react";
import Header from "./header";
import ManagersPageMenu from "./managerspageMenu";

import styles from '../../styles/layout/managerspagelayout.module.scss'


function ManagersPageLayout({ children }) {
  return(
    <div className={ styles.managerspage }>

      <div className={ styles.headerBox }>
        <header className={ styles.header }>
          <Header/>
        </header>
      </div>
      

      <div className={ styles.main }>

        <div className={ styles.menu }>
          <ManagersPageMenu/>
        </div>

        <div className={ styles.contentBox }>
          <div className={ styles.content }>
          {children}
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default ManagersPageLayout