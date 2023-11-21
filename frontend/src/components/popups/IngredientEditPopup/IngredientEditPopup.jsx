import css from "./IngredientEditPopup.module.css"

import { mdiClose } from "@mdi/js"
import Button from "../../ui/Button"
import IngredientEditForm from "../../Ingredients/IngredientEditForm"

export default function IngredientEditPopup({ closeHandler, ingredient }) {
  return (
    <div className={css.popupWrapper}>
      <header className={css.header}>
        <h2 className={css.headline}>Zutat bearbeiten</h2>
        <Button
          svg={mdiClose}
          className={css.close}
          clickHandler={closeHandler}
        />
      </header>
      <IngredientEditForm
        initialIngredient={ingredient}
        closeHandler={closeHandler}
      />
    </div>
  )
}