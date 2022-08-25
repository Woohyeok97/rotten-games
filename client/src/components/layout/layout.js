import React from "react";

//CSS
import styles from '../../styles/layout/layout.module.scss'
//Layout Components
import Header from "./header";
import Footer from './footer'

function Layout({children}) {
  return (
    <>
    <Header/>

    <main className={styles.content}>
    {children}
    </main>

    {/* <Footer/> */}
    </>
  )
}

export default Layout