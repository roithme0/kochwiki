import "./Header.css"

import logo from "../assets/images/logo.png"
import arrowLeft from "../assets/images/mdi/arrow-left.png"

import { Link } from "react-router-dom"

export default function Header({ headline, back }) {
  // render header

  return (
    <header>
      <section className="header-content">
        <Link to="/" className="logo-anchor">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <h1>{headline}</h1>
        <Link to={back.url} className={"back-anchor " + back.visibility}>
          <img src={arrowLeft} alt="Zurück" className="back" />
        </Link>
      </section>
    </header>
  )
}
