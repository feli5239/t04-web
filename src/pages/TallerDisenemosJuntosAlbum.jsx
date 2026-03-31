import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  TALLER_PROJECT_FORM_PATH,
  tallerProjectAlbum,
} from '../data/tallerProjects'

function TallerDisenemosJuntosAlbum() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const activeProject = tallerProjectAlbum[activeProjectIndex]

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

    navigate('/taller04')
  }

  const handlePrevProject = () => {
    setActiveProjectIndex((current) =>
      current === 0 ? tallerProjectAlbum.length - 1 : current - 1,
    )
  }

  const handleNextProject = () => {
    setActiveProjectIndex((current) => (current + 1) % tallerProjectAlbum.length)
  }

  return (
    <main className="page catalog-detail projects-album">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atras"
      />

      <section className="catalog-detail__stage projects-album__stage">
        <button type="button" className="page__back catalog-detail__back" onClick={handleBack}>
          Volver
        </button>

        <div className="catalog-detail__viewer">
          <img
            className="catalog-detail__hero projects-album__hero"
            src={activeProject.image}
            alt={activeProject.name}
          />

          <div className="projects-album__overlay" aria-hidden="true" />

          {tallerProjectAlbum.length > 1 ? (
            <>
              <button
                type="button"
                className="catalog-detail__arrow catalog-detail__arrow--prev"
                onClick={handlePrevProject}
                aria-label="Proyecto anterior"
              >
                <span className="catalog-detail__arrow-mark" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="catalog-detail__arrow catalog-detail__arrow--next"
                onClick={handleNextProject}
                aria-label="Proyecto siguiente"
              >
                <span className="catalog-detail__arrow-mark" aria-hidden="true" />
              </button>
            </>
          ) : null}

        </div>

        <footer className="catalog-detail__footer projects-album__footer">
          <Link to={TALLER_PROJECT_FORM_PATH} className="projects-album__survey-panel">
            <span className="projects-album__survey-kicker">Disenemos juntos</span>
            <strong>Ir al formulario</strong>
          </Link>

          <div className="catalog-detail__info projects-album__info">
            <div className="projects-album__title-row">
              <span className="projects-album__number-box">{activeProject.number}</span>

              <div className="projects-album__copy">
                <p className="catalog-detail__type">
                  {activeProject.type} / {activeProject.number} de{' '}
                  {String(tallerProjectAlbum.length).padStart(2, '0')}
                </p>
                <h1 className="projects-album__project-name">{activeProject.name}</h1>
              </div>
            </div>

            <p className="catalog-detail__description projects-album__description">
              {activeProject.description}
            </p>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default TallerDisenemosJuntosAlbum
