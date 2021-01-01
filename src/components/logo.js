import React from "react"
import { Link } from "gatsby"
import logoImg from "../../static/assets/yenom-nav.png"

const Logo = (props) => (
  <div className="site-logo">
    <Link to="/"><img style={{width: "30px", height: "auto"}} src={logoImg} alt="Your Fit Pal main logo in white"></img></Link>
  </div>
)

export default Logo