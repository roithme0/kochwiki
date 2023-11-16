import css from "./Home.module.css"

import Recipes from "../../assets/images/recipes.png"
import Ingredients from "../../assets/images/ingredients.png"

import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Home({ setHeadline, setBack }) {
  // render home page

  useEffect(() => {
    setHeadline("Startseite")
    setBack({ url: "/", visibility: "hidden" })
  }, [setHeadline, setBack])

  return (
    <main>
      <nav className={css.navWrapper}>
        <Link to="recipes/" className={css.recipesLink}>
          <img src={Recipes} alt="Rezepte" />
        </Link>
        <Link to="ingredients/" className={css.ingredientsLink}>
          <img src={Ingredients} alt="Zutaten" />
        </Link>
      </nav>
    </main>
  )
}
