import css from "./Button.module.css"

import Icon from "@mdi/react"

export default function Button({
  // display a button with an svg or png

  type = "neutral", // neutral, positive, negative -> css classes
  svg = null,
  png = null,
  classes = "",
  clickHandler = event => {},
}) {
  return (
    <button
      onClick={event => clickHandler(event)}
      className={`${css.button} ${css[type]} ${classes}`}
    >
      {svg && <Icon path={svg} size={1} className={css.svg} />}
      {png && <img src={png} alt="" className={css.png} />}
    </button>
  )
}
