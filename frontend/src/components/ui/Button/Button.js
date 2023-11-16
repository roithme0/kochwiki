import "./Button.css"

export default function Button({
  type,
  img,
  alternativeText = "",
  clickHandler = null,
}) {
  return (
    <button
      onClick={clickHandler ? event => clickHandler(event) : undefined}
      className={"button " + type}
    >
      <img src={img} alt={alternativeText} />
    </button>
  )
}
