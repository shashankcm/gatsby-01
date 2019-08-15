import React from "react"
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <div>
      <h1>Hello i'm Developer</h1>
      <h2>I just started working with GATSBY</h2>
      <p>
        Need a Developer ? <Link to="/contact">Contact me.</Link>
      </p>
    </div>
  )
}

export default IndexPage
