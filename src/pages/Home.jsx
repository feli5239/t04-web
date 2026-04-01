import { startTransition, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import tallerImage01 from '../assets/brand/hover/taller04-01.jpg'
import tallerImage02 from '../assets/brand/hover/taller04-02.jpg'
import tallerImage03 from '../assets/brand/hover/taller04-03.jpg'
import tallerImage04 from '../assets/brand/hover/taller04-04.jpg'
import tallerImage05 from '../assets/brand/hover/taller04-05.jpg'
import cosasImage01 from '../assets/brand/hover/04cosas-01.jpg'
import cosasImage02 from '../assets/brand/hover/04cosas-02.jpg'
import cosasImage03 from '../assets/brand/hover/04cosas-03.jpg'
import cosasImage04 from '../assets/brand/hover/04cosas-04.jpg'
import cosasImage05 from '../assets/brand/hover/04cosas-05.jpg'
import estudioImage01 from '../assets/brand/hover/estudio04-01.jpg'
import estudioImage02 from '../assets/brand/hover/estudio04-02.jpg'
import estudioImage03 from '../assets/brand/hover/estudio04-03.jpg'
import estudioImage04 from '../assets/brand/hover/estudio04-04.jpg'
import estudioImage05 from '../assets/brand/hover/estudio04-05.jpg'

const sections = [
  {
    to: '/taller04',
    label: 'Taller04',
    detail: 'mobiliario de diseño y a medida',
    images: [
      tallerImage01,
      tallerImage02,
      tallerImage03,
      tallerImage04,
      tallerImage05,
    ],
    style: {
      '--section-color': 'var(--brand-red)',
      '--enter-delay': '0.12s',
      '--float-duration': '13s',
      '--float-x': '0.35rem',
      '--float-y': '-0.5rem',
    },
  },
  {
    to: '/04cosas',
    label: '04Cosas',
    detail: 'objetos y piezas',
    images: [
      cosasImage01,
      cosasImage02,
      cosasImage03,
      cosasImage04,
      cosasImage05,
    ],
    style: {
      '--section-color': 'var(--brand-yellow)',
      '--enter-delay': '0.26s',
      '--float-duration': '11.5s',
      '--float-x': '-0.28rem',
      '--float-y': '-0.62rem',
    },
  },
  {
    to: '/estudio04',
    label: 'Estudio04',
    detail: 'interiorismo y proyecto',
    images: [
      estudioImage01,
      estudioImage02,
      estudioImage03,
      estudioImage04,
      estudioImage05,
    ],
    style: {
      '--section-color': 'var(--brand-blue)',
      '--enter-delay': '0.4s',
      '--float-duration': '12s',
      '--float-x': '0.42rem',
      '--float-y': '-0.42rem',
    },
  },
]

const burstColors = ['var(--brand-blue)', 'var(--brand-red)', 'var(--brand-yellow)']
const GRID_STEP = 24

function Home() {
  const navigate = useNavigate()
  const homeRef = useRef(null)
  const hoverCountsRef = useRef(
    Object.fromEntries(sections.map((section) => [section.to, 0])),
  )
  const burstTimersRef = useRef(new Map())
  const nextBurstIdRef = useRef(0)
  const [activeSection, setActiveSection] = useState(null)
  const [bursts, setBursts] = useState([])
  const [navTransition, setNavTransition] = useState(null)
  const activeImage =
    activeSection === null
      ? null
      : sections.find((section) => section.to === activeSection.key)?.images[
          activeSection.imageIndex
        ] ?? null

  const handleActivate = (section) => {
    const nextIndex = hoverCountsRef.current[section.to] % section.images.length
    hoverCountsRef.current[section.to] += 1
    setActiveSection({ key: section.to, imageIndex: nextIndex })
  }

  const removeBurst = (id) => {
    setBursts((current) => current.filter((burst) => burst.id !== id))
    const timer = burstTimersRef.current.get(id)
    if (timer) {
      window.clearTimeout(timer)
      burstTimersRef.current.delete(id)
    }
  }

  const handleBackgroundClick = (event) => {
    if (activeSection !== null || navTransition !== null) {
      return
    }

    const target = event.target
    if (
      target instanceof HTMLElement &&
      (target.closest('.word') || target.closest('.home__contact'))
    ) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const id = nextBurstIdRef.current
    const color = burstColors[Math.floor(Math.random() * burstColors.length)]
    const rawX = event.clientX - rect.left
    const rawY = event.clientY - rect.top
    const maxXIndex = Math.floor(rect.width / GRID_STEP)
    const snappedXIndex = Math.min(Math.max(Math.round(rawX / GRID_STEP), 0), maxXIndex)
    const rawYFromBottom = rect.height - rawY
    const maxYIndex = Math.floor(rect.height / GRID_STEP)
    const snappedYIndex = Math.min(
      Math.max(Math.round(rawYFromBottom / GRID_STEP), 0),
      maxYIndex,
    )
    const snappedYFromBottom = snappedYIndex * GRID_STEP
    const localX = snappedXIndex * GRID_STEP
    const localY = rect.height - snappedYFromBottom
    const coordinateX = snappedXIndex
    const coordinateY = snappedYIndex
    nextBurstIdRef.current += 1

    setBursts((current) => [
      ...current,
      {
        id,
        x: localX,
        y: localY,
        color,
        label: `(${coordinateX}, ${coordinateY})`,
      },
    ])

    const timeoutId = window.setTimeout(() => removeBurst(id), 3000)
    burstTimersRef.current.set(id, timeoutId)
  }

  const handleCategoryClick = (event, section) => {
    event.preventDefault()

    if (navTransition !== null) {
      return
    }

    const target = event.currentTarget
    const home = homeRef.current

    if (!(target instanceof HTMLElement) || !(home instanceof HTMLElement)) {
      startTransition(() => navigate(section.to))
      return
    }

    const titleNode = target.querySelector('.word__main')
    const targetRect = target.getBoundingClientRect()
    const titleRect =
      titleNode instanceof HTMLElement ? titleNode.getBoundingClientRect() : targetRect
    const homeRect = home.getBoundingClientRect()
    const x = titleRect.left + titleRect.width / 2 - homeRect.left
    const y = titleRect.top + titleRect.height / 2 - homeRect.top
    const startSize = Math.max(titleRect.height * 1.05, 34)
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(homeRect.width - x, y),
      Math.hypot(x, homeRect.height - y),
      Math.hypot(homeRect.width - x, homeRect.height - y),
    )
    const finalSize = radius * 2 + 120

    setNavTransition({
      to: section.to,
      color: section.style['--section-color'],
      x,
      y,
      startSize,
      scale: finalSize / startSize,
    })
  }

  useEffect(() => {
    const timers = burstTimersRef.current

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }
  }, [])

  useEffect(() => {
    if (navTransition === null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(() => navigate(navTransition.to))
    }, 760)

    return () => window.clearTimeout(timeoutId)
  }, [navTransition, navigate])

  return (
    <main
      ref={homeRef}
      className={`home${navTransition ? ' home--transitioning' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="home__backdrop" aria-hidden="true">
        {activeImage ? (
          <img
            key={`${activeSection.key}-${activeSection.imageIndex}`}
            className="home__backdrop-image home__backdrop-image--active"
            src={activeImage}
            alt=""
          />
        ) : null}
      </div>

      <div className="home__bursts" aria-hidden="true">
        {bursts.map((burst) => (
          <span
            key={`grid-${burst.id}`}
            className="home__grid-flash"
            style={{
              '--flash-color': burst.color,
              '--flash-origin-x': `${burst.x}px`,
              '--flash-origin-y': `${burst.y}px`,
            }}
          />
        ))}

        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="home__burst"
            style={{
              '--burst-color': burst.color,
              left: `${burst.x}px`,
              top: `${burst.y}px`,
            }}
          >
            <span className="home__burst-sphere" />
            <span className="home__burst-coordinate">{burst.label}</span>
          </span>
        ))}
      </div>

      <div className="home__nav-transition" aria-hidden="true">
        {navTransition ? (
          <span
            className="home__nav-circle"
            style={{
              '--nav-color': navTransition.color,
              '--nav-start-size': `${navTransition.startSize}px`,
              '--nav-scale': navTransition.scale,
              left: `${navTransition.x}px`,
              top: `${navTransition.y}px`,
            }}
          />
        ) : null}
      </div>

      <section
        className="home__words"
        aria-label="Categorías principales"
        style={{ '--columns': sections.length }}
      >
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className={`word${activeSection?.key === section.to ? ' word--active' : ''}`}
            style={section.style}
            onMouseEnter={() => handleActivate(section)}
            onMouseLeave={() => setActiveSection(null)}
            onFocus={() => handleActivate(section)}
            onBlur={() => setActiveSection(null)}
            onClick={(event) => handleCategoryClick(event, section)}
          >
            <span className="word__shell">
              <span className="word__content">
                <span className="word__main">{section.label}</span>
                <span className="word__detail">{section.detail}</span>
              </span>
              <span className="word__line" aria-hidden="true"></span>
            </span>
          </Link>
        ))}
      </section>

      <footer className="home__contact" aria-label="Datos de contacto">
        <span className="home__contact-label">Contacto</span>
        <p>
          Felipe Cal 093 712 138 / Micaela Andrada 091 985 171
        </p>
        <p>
          <a href="mailto:04.taller.04@gmail.com">04.taller.04@gmail.com</a>
        </p>
        <p>
          <a href="https://instagram.com/taller.04" target="_blank" rel="noreferrer">
            Ig. @taller.04
          </a>{' '}
          / Montevideo, Uruguay
        </p>
      </footer>
    </main>
  )
}

export default Home
