import css from "./NonFieldErrors.module.css"

export default function NonFieldErrors({
  nonFieldErrors, // Array<String> -> non field errors
}) {
  return (
    <div className={css.nonFieldErrors}>
      {nonFieldErrors.map((error, index) => (
        <p key={index} className={css.nonFieldError}>
          {error}
        </p>
      ))}
    </div>
  )
}
