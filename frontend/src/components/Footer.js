import "./Footer.css"

import AccountStarOutline from "../assets/images/mdi/account-star-outline.png"

export default function Footer() {
  return (
    <footer>
      <section className="footer-content">
        <a href="#" className="admin-anchor">
          <img src={AccountStarOutline} alt="Admin" className="admin" />
        </a>
      </section>
    </footer>
  )
}
