import css from "./Button.module.css"

import Icon from "@mdi/react"

export default function Button({
  type = "neutral", // neutral, positive, negative -> css classes
  icon,
  classes = "",
  clickHandler = event => {},
}) {
  return (
    <button
      onClick={event => clickHandler(event)}
      className={`${css.button} ${css[type]} ${classes}`}
    >
      <Icon path={icon} size={1} className={css.icon} />
    </button>
  )
}
