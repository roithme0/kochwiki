import "./InputText.css"

export default function InputText({ name, value, setValue }) {
  return (
    <div className="input input-text">
      <input
        type="text"
        name={name}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}
