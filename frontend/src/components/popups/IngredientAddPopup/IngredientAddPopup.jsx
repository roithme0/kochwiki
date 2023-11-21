import css from "./IngredientAddPopup.module.css"

import { mdiClose } from "@mdi/js"
import Button from "../../ui/Button"
import IngredientAddForm from "../../Ingredients/IngredientAddForm"

export default function IngredientAddPopup({ closeHandler }) {
  return (
    <div className={css.popupWrapper}>
      <header className={css.header}>
        <h2 className={css.headline}>Zutat erstellen</h2>
        <Button
          svg={mdiClose}
          className={css.close}
          clickHandler={() => closeHandler({ changedIngredient: null })}
        />
      </header>
      <IngredientAddForm closeHandler={closeHandler} />
    </div>
  )
}
