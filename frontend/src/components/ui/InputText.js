import "./InputText.css"

export default function InputText({ value, setValue }) {
  return (
    <div className="input-text">
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}
