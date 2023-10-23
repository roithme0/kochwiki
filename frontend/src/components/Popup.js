import "./Popup.css"

import close from "../assets/images/mdi/close.png"

import Button from "./ui/Button.js"

export default function Popup({ closePopup, Component, title, ...props }) {
  return (
    <div className="popup">
      <div className="background"></div>
      <div className="popup-wrapper">
        <div className="header">
          <h2 className="title">{title}</h2>
          <Button
            type={"neutral"}
            img={close}
            clickHandler={event => closePopup({ event: event })}
            classNames={"close"}
          />
        </div>
        <Component closePopup={closePopup} {...props}></Component>
      </div>
    </div>
  )
}
