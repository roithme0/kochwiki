import "./Header.css"

import Logo from "../assets/images/logo.png"
import ArrowLeft from "../assets/images/mdi/arrow-left.png"

export default function Header({ headline }) {
  return (
    <header>
      <section className="header-content">
        <a href="#" className="logo-anchor">
          <img src={Logo} alt="Logo" className="logo" />
        </a>
        <h1>{headline}</h1>
        <a href="#" className="back-anchor">
          <img src={ArrowLeft} alt="Zurück" className="back" />
        </a>
      </section>
    </header>
  )
}
