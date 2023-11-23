import css from "./RecipesGridElement.module.css"

import Button from "../../ui/Button"
import { mdiImageOffOutline } from "@mdi/js"

export default function RecipesGridElement({ recipe }) {
  return (
    <div className={css.elementWrapper}>
      {recipe.image ? (
        <Button img={recipe.image} className={css.image} />
      ) : (
        <Button svg={mdiImageOffOutline} className={css.image} />
      )}
      <p>{recipe.name}</p>
    </div>
  )
}
