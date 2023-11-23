import css from "./Footer.module.css"

import Button from "../ui/Button"

export default function Footer({
  buttons, // :Array<Object> [{icon: ?, clickHanlder: ?}, ...]
}) {
  // render footer with given buttons

  return (
    <footer className={css.footer}>
      <section className={css.footerContent}>
        {buttons.map((button, index) => (
          <Button
            svg={button.icon}
            className={css.button}
            clickHandler={button.clickHandler}
            key={index}
          />
        ))}
      </section>
    </footer>
  )
}
