import "./Button.css"

export default function Button({ type, img, classNames }) {
  return (
    <button className={"button " + type}>
      <img src={img} className={classNames} />
    </button>
  )
}
