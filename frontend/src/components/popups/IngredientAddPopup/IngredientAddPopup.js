import css from "./IngredientAddPopup.module.css"

import { mdiClose } from "@mdi/js"
import Button from "../../ui/Button/Button"

export default function IngredientAddPopup({ closeHandler }) {
  return (
    <>
      <header className={css.header}>
        <h2 className={css.headline}>Zutat erstellen</h2>
        <Button
          svg={mdiClose}
          className={css.close}
          clickHandler={closeHandler}
        />
      </header>
      <form className={css.form}></form>
    </>
  )
}
