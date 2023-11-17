import css from "./Footer.module.css"

import Button from "../ui/Button/Button"

export default function Footer({ buttons }) {
  // render footer
  // buttons: [{img: ?, clickHanlder: ?}, ...]

  return (
    <footer className={css.footer}>
      <section className={css.footerContent}>
        {buttons.map((button, index) => (
          <Button
            img={button["img"]}
            clickHandler={button["clickHandler"]}
            key={index}
          />
        ))}
      </section>
    </footer>
  )
}
