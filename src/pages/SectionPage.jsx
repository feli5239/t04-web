import { useLocation, useNavigate } from 'react-router-dom'

function SectionPage({ title, intro, cards, heroImage, heroAlt, eyebrow }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () => {
    const historyIndex =
      typeof window !== 'undefined' &&
      typeof window.history.state?.idx === 'number'
        ? window.history.state.idx
        : 0

    if (historyIndex > 0 || location.key !== 'default') {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return (
    <main className="page">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atrás"
      />

      <div className="page__panel">
        <button type="button" className="page__back" onClick={handleBack}>
          Volver
        </button>

        <section className="page__hero">
          <header className="page__header">
            {eyebrow ? <span className="page__eyebrow">{eyebrow}</span> : null}
            <h1>{title}</h1>
            <p>{intro}</p>
          </header>

          {heroImage ? (
            <div className="page__media">
              <img src={heroImage} alt={heroAlt} />
            </div>
          ) : null}
        </section>

        <section className="page__grid">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="page__card"
              style={{ '--card-delay': `${index * 110 + 180}ms` }}
            >
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default SectionPage
