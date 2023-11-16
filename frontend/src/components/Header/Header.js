import css from "./Header.module.css"

import logo from "../../assets/images/logo.png"
import arrowLeft from "../../assets/images/mdi/arrow-left.png"

import { Link } from "react-router-dom"

export default function Header({ headline, back }) {
  // render header

  return (
    <header className={css.header}>
      <section className={css.headerContent}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <h1 className={css.h1}>{headline}</h1>
        <Link to={back.url} className={css[back.visibility]}>
          <img src={arrowLeft} alt="Zurück" />
        </Link>
      </section>
    </header>
  )
}
