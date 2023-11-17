import css from "./Button.module.css"

import Icon from "@mdi/react"

export default function Button({
  // display a button with an svg or png

  type = "neutral", // neutral, positive, negative -> css className
  svg = null,
  png = null,
  className = "",
  clickHandler = event => {},
}) {
  return (
    <button
      onClick={event => clickHandler(event)}
      className={`${css.button} ${css[type]} ${className}`}
    >
      {svg && <Icon path={svg} size={1} className={css.svg} />}
      {png && <img src={png} alt="" className={css.png} />}
    </button>
  )
}
