import css from "./Home.module.css"

import { mdiAccountStarOutline } from "@mdi/js"
import recipes from "../../assets/images/recipes.png"
import ingredients from "../../assets/images/ingredients.png"
import Button from "../../components/ui/Button/Button"
import { useEffect } from "react"

export default function Home({ setHeadline, setBack, setButtons }) {
  // render home page

  useEffect(() => {
    setHeadline("Startseite")
    setBack({ url: "/", visibility: "hidden" })
    setButtons([
      {
        icon: mdiAccountStarOutline,
        clickHandler: () =>
          (window.location.href = "http://localhost:8000/admin/"),
      },
    ])
  }, [])

  return (
    <main>
      <nav className={css.navWrapper}>
        <Button
          png={recipes}
          classes={css.button}
          clickHandler={() => (window.location.href = "/recipes/")}
        />
        <Button
          png={ingredients}
          classes={css.button}
          clickHandler={() => (window.location.href = "/ingredients/")}
        />
      </nav>
    </main>
  )
}
