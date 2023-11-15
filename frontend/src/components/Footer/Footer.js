import "./Footer.css"

import accountStarOutline from "../../assets/images/mdi/account-star-outline.png"

import { Link } from "react-router-dom"

export default function Footer() {
  // render footer

  return (
    <footer>
      <section className="footer-content">
        <Link to="/admin" className="admin-anchor">
          <img src={accountStarOutline} alt="Admin" className="admin" />
        </Link>
      </section>
    </footer>
  )
}
