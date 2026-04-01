import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  getCatalogProductById,
  getCatalogProductStatus,
} from '../data/tallerCatalog'

const SWIPE_THRESHOLD = 44
const IMAGE_TRANSITION_MS = 420

function TallerCatalogoDetalle() {
  const location = useLocation()
  const navigate = useNavigate()
  const { productId } = useParams()
  const product = getCatalogProductById(productId ?? '')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [previousImageIndex, setPreviousImageIndex] = useState(null)
  const [transitionDirection, setTransitionDirection] = useState('next')
  const [transitionToken, setTransitionToken] = useState(0)
  const touchStartXRef = useRef(null)
  const transitionTimeoutRef = useRef(null)

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

    navigate('/taller04/catalogo')
  }

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  const moveToImage = (nextIndex, direction) => {
    if (nextIndex === activeImageIndex) {
      return
    }

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    setPreviousImageIndex(activeImageIndex)
    setTransitionDirection(direction)
    setTransitionToken((current) => current + 1)
    setActiveImageIndex(nextIndex)

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousImageIndex(null)
      transitionTimeoutRef.current = null
    }, IMAGE_TRANSITION_MS)
  }

  const handlePrevImage = () => {
    moveToImage(activeImageIndex === 0 ? product.gallery.length - 1 : activeImageIndex - 1, 'prev')
  }

  const handleNextImage = () => {
    moveToImage((activeImageIndex + 1) % product.gallery.length, 'next')
  }

  const handleTouchStart = (event) => {
    if (product.gallery.length <= 1 || event.changedTouches.length !== 1) {
      return
    }

    touchStartXRef.current = event.changedTouches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (
      product.gallery.length <= 1 ||
      touchStartXRef.current === null ||
      event.changedTouches.length !== 1
    ) {
      touchStartXRef.current = null
      return
    }

    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current
    touchStartXRef.current = null

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return
    }

    if (deltaX > 0) {
      handlePrevImage()
      return
    }

    handleNextImage()
  }

  const handleTouchCancel = () => {
    touchStartXRef.current = null
  }

  if (product === null) {
    return (
      <main className="page catalog-detail">
        <button
          type="button"
          className="page__back-zone"
          onClick={handleBack}
          aria-label="Volver atrás"
        />

        <section className="catalog-detail__empty">
          <button type="button" className="page__back catalog-detail__back" onClick={handleBack}>
            Volver
          </button>

          <h1>Producto no encontrado</h1>
          <p>Este producto no está disponible en el catálogo actual.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="page catalog-detail">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atrás"
      />

      <section className="catalog-detail__stage">
        <button type="button" className="page__back catalog-detail__back" onClick={handleBack}>
          Volver
        </button>

        <div
          className="catalog-detail__viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            className={`catalog-detail__hero-stack${
              previousImageIndex !== null
                ? ` is-animating catalog-detail__hero-stack--${transitionDirection}`
                : ''
            }`}
          >
            {previousImageIndex !== null ? (
              <img
                key={`previous-${previousImageIndex}-${transitionToken}`}
                className="catalog-detail__hero catalog-detail__hero--previous"
                src={product.gallery[previousImageIndex]}
                alt=""
                aria-hidden="true"
              />
            ) : null}

            <img
              key={`current-${activeImageIndex}-${transitionToken}`}
              className="catalog-detail__hero catalog-detail__hero--current"
              src={product.gallery[activeImageIndex]}
              alt={product.name}
            />
          </div>

          {product.gallery.length > 1 ? (
            <>
              <button
                type="button"
                className="catalog-detail__hit-zone catalog-detail__hit-zone--prev"
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
              >
                <span className="catalog-detail__arrow catalog-detail__arrow--prev">
                  <span className="catalog-detail__arrow-mark" aria-hidden="true" />
                </span>
              </button>

              <button
                type="button"
                className="catalog-detail__hit-zone catalog-detail__hit-zone--next"
                onClick={handleNextImage}
                aria-label="Imagen siguiente"
              >
                <span className="catalog-detail__arrow catalog-detail__arrow--next">
                  <span className="catalog-detail__arrow-mark" aria-hidden="true" />
                </span>
              </button>
            </>
          ) : null}

          <span className="catalog-detail__counter" aria-hidden="true">
            {String(activeImageIndex + 1).padStart(2, '0')} /{' '}
            {String(product.gallery.length).padStart(2, '0')}
          </span>
        </div>

        <footer className="catalog-detail__footer">
          <header className="catalog-detail__header">
            <p className="catalog-detail__eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
          </header>

          <div className="catalog-detail__info">
            <p className="catalog-detail__type">{product.type}</p>
            <p className="catalog-detail__description">{product.description}</p>

            <dl className="catalog-detail__specs">
              <div>
                <dt>Disponibilidad</dt>
                <dd>{getCatalogProductStatus(product)}</dd>
              </div>
              <div>
                <dt>Material</dt>
                <dd>{product.material}</dd>
              </div>
              <div>
                <dt>Medidas</dt>
                <dd>{product.size}</dd>
              </div>
              <div>
                <dt>Colores</dt>
                <dd>{product.colors.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default TallerCatalogoDetalle
