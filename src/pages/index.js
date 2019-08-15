import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import "../styles/index.scss"

const IndexPage = () => {
  return (
    <Layout>
      <h1>Hello i'm Developer</h1>
      <h2>I just started working with GATSBY</h2>
      <p>
        Need a Developer ? <Link to="/contact">Contact me.</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
