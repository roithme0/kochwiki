import "./NonFieldErrors.css"

export default function NonFieldErrors({ nonFieldErrors }) {
  return (
    <div className="non-field-errors">
      {nonFieldErrors.map((error, index) => (
        <p key={index} className="non-field-error">
          {error}
        </p>
      ))}
    </div>
  )
}
