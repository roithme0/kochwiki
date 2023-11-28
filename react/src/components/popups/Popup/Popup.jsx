import "./Popup.css"

export default function Popup({
  Component, // component to render
  ...props // props to pass to component
}) {
  return (
    <div className="popup">
      <div className="popup-wrapper">
        <Component {...props}></Component>
      </div>
    </div>
  )
}
