import css from "./InputText.module.css"

export default function InputText({
  className = css.dummy, // css.class -> css className of input field
  value = "", // String -> value of input field
  changeHandler = () => {}, // Function -> change handler of input field
  refValue = null, // Ref -> ref of input field
}) {
  // render input text field

  return (
    <input
      type="text"
      className={className}
      value={value}
      ref={refValue}
      onChange={event => changeHandler(event.target.value)}
    />
  )
}
