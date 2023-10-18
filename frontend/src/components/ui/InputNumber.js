export default function InputNumber({ value, setValue }) {
  return (
    <input
      type="number"
      value={value}
      onChange={event => {
        const value = event.target.value
        !isNaN(parseFloat(value)) ? setValue(value) : setValue(value)
      }}
    />
  )
}
