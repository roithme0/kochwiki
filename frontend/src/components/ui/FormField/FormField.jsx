import css from "./FormField.module.css"

export default function FormField({ label, type }) {
  return (
    <>
      <label className={css.label}>{label}</label>
      <input type={type} className={css.input} />
    </>
  )
}
