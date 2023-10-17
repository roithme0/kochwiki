import "./Header.css"

import logo from "../assets/images/logo.png"
import arrowLeft from "../assets/images/mdi/arrow-left.png"

import { Link } from "react-router-dom"

export default function Header({ headline }) {
  return (
    <header>
      <section className="header-content">
        <a href="#" className="logo-anchor">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <h1>{headline}</h1>
        <a href="#" className="back-anchor">
          <img src={arrowLeft} alt="Zurück" className="back" />
        </a>
      </section>
    </header>
  )
}
