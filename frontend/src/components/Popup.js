import "./Popup.css"

import EditIngredient from "./EditIngredient.js"

export default function Popup({ Component, props }) {
  console.log(props)
  return (
    <div className="popup">
      <div className="background"></div>
      <div className="popup-wrapper">
        <Component {...props}></Component>
      </div>
    </div>
  )
}
