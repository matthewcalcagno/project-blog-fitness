/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import SEO from '../components/seo';

const styles = {
  'article blockquote': {
    'background-color': 'cardBg'
  },
  pagination: {
    'a': {
      color: 'muted',
      '&.is-active': {
        color: 'text'
      },
      '&:hover': {
        color: 'text'
      }
    }
  }
}

const Pagination = (props) => (
  <div 
    className="pagination -post"
    sx={styles.pagination}
  >
    <ul>
        {(props.previous && props.previous.frontmatter.template === 'blog-post') && (
          <li>
              <Link to={"/" + props.previous.frontmatter.slug} rel="prev">
                <p
                  sx={{
                    color: 'muted'
                  }}
                >
                  <span className="icon -left"><RiArrowLeftLine/></span> Anterior</p>
                <span className="page-title">{props.previous.frontmatter.title}</span>
              </Link>
          </li>
        )}
        {(props.next && props.next.frontmatter.template === 'blog-post') && (
          <li>
            <Link to={"/" + props.next.frontmatter.slug} rel="next">
              <p
                sx={{
                  color: 'muted'
                }}
              >Siguiente <span className="icon -right"><RiArrowRightLine/></span></p>
              <span className="page-title">{props.next.frontmatter.title}</span>
            </Link>
          </li>
        )}
    </ul>
  </div>
)

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  const Image = frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid : ""
  const { previous, next } = pageContext
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  let props = {
    previous,
    next
  }

  return (
    <Layout className="page">
      <SEO
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        image={Image}
        article={true}
      />
      <article className="blog-post">
        <header className="featured-banner">
          <section className="article-header">
            <h1>{frontmatter.title}</h1>
            <time>
              {new Date(frontmatter.date).toLocaleDateString("es-ES", options)}
            </time>
          </section>
          {Image ? (
            <Img
              fluid={Image}
              objectFit="cover"
              objectPosition="50% 50%"
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : (
            ""
          )}
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      {(previous || next) && <Pagination {...props} />}
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
         query BlogPostQuery($id: String!) {
           markdownRemark(id: { eq: $id }) {
             id
             html
             excerpt(pruneLength: 148)
             frontmatter {
               date(formatString: "DD,MMMM YYYY")
               slug
               title
               description
               featuredImage {
                 childImageSharp {
                   fluid(
                     maxWidth: 1980
                     maxHeight: 768
                     quality: 80
                     srcSetBreakpoints: [350, 700, 1050, 1400]
                   ) {
                     ...GatsbyImageSharpFluid
                     ...GatsbyImageSharpFluidLimitPresentationSize
                   }
                   sizes {
                     src
                   }
                 }
               }
             }
           }
         }
       `