import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        description
      }
      html
    }
  }
`

const blog = props => {
  const { title, date, description } = props.data.markdownRemark.frontmatter
  return (
    <Layout>
      <h1>{title}</h1>
      <h4>{description}</h4>
      <p>{date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      ></div>
    </Layout>
  )
}
export default blog
