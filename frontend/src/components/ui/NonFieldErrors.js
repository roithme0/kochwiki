import "./NonFieldErrors.css"

export default function NonFieldErrors({ nonFieldErrors }) {
  return (
    <div className="non-field-errors">
      {nonFieldErrors.map((error, index) => (
        <span key={index} className="non-field-error">
          {error}
        </span>
      ))}
    </div>
  )
}
