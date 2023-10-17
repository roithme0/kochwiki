import "./Header.css"

export default function Header({ headline }) {
  return (
    <header>
      <section className="header-content">
        <a href="#" className="logo-anchor">
          <img src="#" alt="Logo" className="logo" />
        </a>
        <h1>{headline}</h1>
        <a href="#" className="back-anchor">
          <img src="#" alt="Zurück" className="back" />
        </a>
      </section>
    </header>
  )
}
