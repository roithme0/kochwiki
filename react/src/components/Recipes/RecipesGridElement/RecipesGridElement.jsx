import css from "./RecipesGridElement.module.css"

import Icon from "@mdi/react"
import { mdiImageOffOutline } from "@mdi/js"
import { Link } from "react-router-dom"

export default function RecipesGridElement({ recipe }) {
  return (
    <Link to="#" className={css.elementWrapper}>
      {recipe.image ? (
        <img src={recipe.image} className={css.image} />
      ) : (
        <Icon path={mdiImageOffOutline} size={1} className={css.icon} />
      )}
      <p className={css.name}>{recipe.name}</p>
    </Link>
  )
}
