import "./Popup.css"

export default function Popup({ Component, ...props }) {
  return (
    <div className="popup">
      <div className="popup-wrapper">
        <Component {...props}></Component>
      </div>
    </div>
  )
}
