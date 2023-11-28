import css from "./LoadingPopup.module.css"

import Button from "../../ui/Button"
import { mdiClose } from "@mdi/js"

export default function LoadingPopup({
  text, // String -> text to display
  closeHandler = () => {}, // Function -> close this popup
}) {
  return (
    <div className={css.popupWrapper}>
      <p className={css.text}>{text}</p>
      <Button
        svg={mdiClose}
        className={css.close}
        clickHandler={closeHandler}
      />
    </div>
  )
}
