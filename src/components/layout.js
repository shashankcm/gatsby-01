import React from "react"

import Header from "./header"
import Footer from "./footer"
//import "./layout.css"

import layoutStyles from "./layout.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
