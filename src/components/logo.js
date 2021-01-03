import React from "react"
import { Link } from "gatsby"
import logoImg from "../../static/assets/yenom-main-nav.png"

const Logo = (props) => (
  <div className="site-logo">
    <Link to="/"><img style={{width: "50%", height: "auto"}} src={logoImg} alt="Yenom main logo in white"></img></Link>
  </div>
)

export default Logo