import css from "./IngredientDeletePopup.module.css"

import { mdiClose } from "@mdi/js"
import Button from "../../ui/Button"
import IngredientDeleteForm from "../../Ingredients/IngredientDeleteForm"

export default function IngredientDeletePopup({ ingredient, closeHandler }) {
  return (
    <div className={css.popupWrapper}>
      <header className={css.header}>
        <h2 className={css.headline}>Zutat löschen</h2>
        <Button
          svg={mdiClose}
          className={css.close}
          clickHandler={() => closeHandler({ deletedIngredientID: null })}
        />
      </header>
      <IngredientDeleteForm
        ingredient={ingredient}
        closeHandler={closeHandler}
      />
    </div>
  )
}
