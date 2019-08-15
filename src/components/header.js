import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Shashank Chikattimala</Link>
      </h1>
      {/* <Link to="/">Home</Link> {" | "}
      <Link to="/blog">Blog</Link> {" | "}
      <Link to="/about">About me</Link> {" | "}
      <Link to="/contact">Contact me</Link> */}

      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/about">About me</Link>
        </li>
        <li>
          <Link to="/contact">Contact me</Link>
        </li>
      </nav>
    </header>
  )
}
export default Header
