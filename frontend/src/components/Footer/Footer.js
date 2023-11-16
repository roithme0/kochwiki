import css from "./Footer.module.css"

import accountStarOutline from "../../assets/images/mdi/account-star-outline.png"
import { Link } from "react-router-dom"

export default function Footer() {
  // render footer

  return (
    <footer className={css.footer}>
      <section className={css.footerContent}>
        <Link to="/admin">
          <img src={accountStarOutline} alt="Admin" />
        </Link>
      </section>
    </footer>
  )
}
