import "./Button.css"

export default function Button({
  type,
  img,
  alternativeText = "",
  clickHandler,
  classNames = "",
}) {
  return (
    <button
      onClick={clickHandler ? event => clickHandler(event) : undefined}
      className={"button " + type}
    >
      <img src={img} alt={alternativeText} className={classNames} />
    </button>
  )
}
