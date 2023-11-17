import css from "./Header.module.css"

import logo from "../../assets/images/logo.png"
import { mdiArrowLeft } from "@mdi/js"
import Button from "../ui/Button/Button"

export default function Header({ headline, back }) {
  // render header

  return (
    <header className={css.header}>
      <section className={css.headerContent}>
        <Button
          png={logo}
          clickHandler={() => (window.location.href = "/")}
          classes={css.button}
        />
        <h1 className={css.h1}>{headline}</h1>
        <Button
          svg={mdiArrowLeft}
          clickHandler={() => (window.location.href = back.url)}
          classes={`${css.button} ${css[back.visibility]}`}
        />
      </section>
    </header>
  )
}
