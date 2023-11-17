import css from "./Footer.module.css"

import Button from "../ui/Button/Button"

export default function Footer({ buttons }) {
  // render footer
  // buttons: [{icon: ?, clickHanlder: ?}, ...]

  return (
    <footer className={css.footer}>
      <section className={css.footerContent}>
        {buttons.map((button, index) => (
          <Button
            icon={button.icon}
            classes={css.icon}
            clickHandler={button.clickHandler}
            key={index}
          />
        ))}
      </section>
    </footer>
  )
}
