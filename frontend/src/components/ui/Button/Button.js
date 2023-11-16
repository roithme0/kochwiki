import css from "./Button.module.css"

export default function Button({
  type, // neutral, positive, negative -> css classes
  img,
  alternativeText = "",
  className = "",
  clickHandler = event => {},
}) {
  return (
    <button
      onClick={event => clickHandler(event)}
      className={`${css.button} ${css[type]} ${className}`}
    >
      <img src={img} alt={alternativeText} />
    </button>
  )
}
