import "./Input.css"
import "./InputNumber.css"

export default function InputNumber({ value, setValue }) {
  return (
    <div className="input input-number">
      <input
        type="number"
        value={value}
        onChange={event => {
          const value = event.target.value
          !isNaN(parseFloat(value)) ? setValue(value) : setValue(value)
        }}
      />
    </div>
  )
}
