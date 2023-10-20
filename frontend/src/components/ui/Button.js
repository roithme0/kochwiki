import "./Button.css"

export default function Button({ type, img, onClick, classNames }) {
  return (
    <button className={"button " + type}>
      <img src={img} onClick={onClick} className={classNames} />
    </button>
  )
}
