import css from "./InputFloat.module.css"

export default function InputFloat({
  className = css.dummy, // css.class -> css className of input field
  value = "", // String -> value of input field
  changeHandler = () => {}, // Function -> change handler of input field
  refValue = null, // Ref -> ref of input field
}) {
  // render input number field

  return (
    <input
      type="number"
      className={className}
      value={value}
      ref={refValue}
      onChange={event => changeHandler(event.target.value)}
    />
  )
}
