import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import tallerImage01 from '../assets/brand/hover/taller04-01.jpg'
import tallerImage02 from '../assets/brand/hover/taller04-02.jpg'
import tallerImage03 from '../assets/brand/hover/taller04-03.jpg'
import tallerImage04 from '../assets/brand/hover/taller04-04.jpg'
import tallerImage05 from '../assets/brand/hover/taller04-05.jpg'

const slides = [
  tallerImage01,
  tallerImage02,
  tallerImage03,
  tallerImage04,
  tallerImage05,
]

const accessCards = [
  {
    to: '/taller04/catalogo',
    label: 'Catálogo',
  },
  {
    to: '/taller04/disenemos-juntos',
    label: 'Diseñemos juntos',
  },
]

function Taller04() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <main className="page page--taller-landing">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atrás"
      />

      <section className="taller-landing">
        <button type="button" className="page__back page__back--taller" onClick={handleBack}>
          Volver
        </button>

        <header className="taller-landing__brand">
          <div className="taller-landing__brand-row">
            <div className="taller-landing__logo" aria-label="Logo Taller04">
              <span className="taller-landing__logo-mark">04</span>

              <div className="taller-landing__logo-copy">
                <h1>Taller04</h1>
                <p>mobiliario de diseño y a medida</p>
              </div>
            </div>

            <p className="taller-landing__summary">
              Diseñamos y fabricamos piezas para habitar mejor, con una mirada precisa
              sobre uso, materia y detalle.
            </p>
          </div>
        </header>

        <Link
          to="/taller04/disenemos-juntos"
          className="taller-landing__viewer taller-landing__viewer--link"
          aria-label="Ver nuestros proyectos"
        >
          {slides.map((image, index) => (
            <img
              key={image}
              className={`taller-landing__image${index === activeSlide ? ' is-active' : ''}`}
              src={image}
              alt=""
            />
          ))}

          <div className="taller-landing__viewer-overlay" aria-hidden="true" />

          <div className="taller-landing__viewer-copy" aria-hidden="true">
            <span className="taller-landing__viewer-kicker">Taller04 / procesos</span>
            <strong>Ver proyectos a medida</strong>
          </div>

          <div className="taller-landing__status" aria-hidden="true">
            <span>{String(activeSlide + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </Link>

        <nav className="taller-landing__actions" aria-label="Accesos Taller04">
          {accessCards.map((card) => (
            <Link key={card.to} to={card.to} className="taller-landing__action">
              <span className="taller-landing__action-title">{card.label}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  )
}

export default Taller04
