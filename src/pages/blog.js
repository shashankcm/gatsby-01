import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout"

import blogStyles from "./blog.module.scss"

const BlogPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                date
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  //console.log(data)
  return (
    <Layout>
      <h1>Posts</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map((edge, index) => {
          return (
            <li key={index} className={blogStyles.post}>
              <h2>{edge.node.frontmatter.title}</h2>
              <span>{edge.node.frontmatter.date}</span>
              <Link to={`/blog/${edge.node.fields.slug}`}>Read more...</Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}
export default BlogPage
