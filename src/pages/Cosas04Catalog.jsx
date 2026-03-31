import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  cosasCatalogFilterGroups,
  cosasCatalogProjects,
  normalizeCosasText,
} from '../data/cosasCatalog'

function Cosas04Catalog() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    materials: null,
  })
  const [activePreviewId, setActivePreviewId] = useState(null)
  const deferredQuery = useDeferredValue(query)
  const closeTimerRef = useRef(null)
  const previewScrollRef = useRef(null)
  const normalizedQuery = normalizeCosasText(deferredQuery.trim())

  const filteredProjects = cosasCatalogProjects.filter((project) => {
    const matchesQuery =
      normalizedQuery === '' ||
      normalizeCosasText(
        [
          project.name,
          project.category,
          project.description,
          project.size,
          ...project.materials,
        ].join(' '),
      ).includes(normalizedQuery)

    const matchesCategory =
      activeFilters.category === null || project.category === activeFilters.category
    const matchesMaterial =
      activeFilters.materials === null || project.materials.includes(activeFilters.materials)

    return matchesQuery && matchesCategory && matchesMaterial
  })

  const activePreview =
    filteredProjects.find((project) => project.id === activePreviewId) ??
    cosasCatalogProjects.find((project) => project.id === activePreviewId) ??
    null

  useEffect(() => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0
    }
  }, [activePreviewId])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

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

  const clearPreviewClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openPreview = (projectId) => {
    clearPreviewClose()
    setActivePreviewId(projectId)
  }

  const schedulePreviewClose = () => {
    clearPreviewClose()
    closeTimerRef.current = window.setTimeout(() => {
      setActivePreviewId(null)
    }, 120)
  }

  const toggleFilter = (key, option) => {
    setActiveFilters((current) => ({
      ...current,
      [key]: current[key] === option ? null : option,
    }))
  }

  const clearFilters = () => {
    setActiveFilters({
      category: null,
      materials: null,
    })
  }

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length
  const columnCount = 4
  const occupiedTopRows = 1 + (filtersOpen ? 1 : 0)
  const productRows = Math.max(1, Math.ceil(filteredProjects.length / columnCount))
  const totalRows = occupiedTopRows + productRows

  return (
    <main className="page cosas-page">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atras"
      />

      <button type="button" className="page__back cosas-page__back" onClick={handleBack}>
        Volver
      </button>

      <div className="cosas-page__axis cosas-page__axis--columns" aria-hidden="true">
        {Array.from({ length: columnCount }, (_, index) => (
          <span key={`column-${index + 1}`}>{index + 1}</span>
        ))}
      </div>

      <div className="cosas-page__axis cosas-page__axis--rows" aria-hidden="true">
        {Array.from({ length: totalRows }, (_, index) => (
          <span key={`row-${index + 1}`} style={{ '--axis-row': index }}>
            {index + 1}
          </span>
        ))}
      </div>

      <section className="cosas-page__grid" aria-label="Catalogo 04Cosas">
        <header className="cosas-page__chrome">
          <div className="cosas-page__toolbar">
            <label className="cosas-page__search">
              <span className="cosas-page__search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" />
                  <path d="M16 16l4.5 4.5" fill="none" stroke="currentColor" />
                </svg>
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, categoria o material"
                aria-label="Buscar piezas 04Cosas"
              />
            </label>

            <button
              type="button"
              className="cosas-page__filters-toggle"
              onClick={() => setFiltersOpen((current) => !current)}
              aria-expanded={filtersOpen}
              aria-controls="cosas-filters"
            >
              Filtros
              {activeFilterCount > 0 ? (
                <span className="cosas-page__filters-count">{activeFilterCount}</span>
              ) : null}
            </button>
          </div>

          <p className="cosas-page__results">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'pieza' : 'piezas'}
            {deferredQuery.trim() ? ` para "${deferredQuery.trim()}"` : ''}
          </p>

          {filtersOpen ? (
            <section
              id="cosas-filters"
              className="cosas-page__filters"
              aria-label="Filtros 04Cosas"
            >
              {cosasCatalogFilterGroups.map((group) => (
                <div key={group.key} className="cosas-page__filter-group">
                  <h2>{group.label}</h2>

                  <div className="cosas-page__filter-options">
                    {group.options.map((option) => {
                      const isActive = activeFilters[group.key] === option

                      return (
                        <button
                          key={option}
                          type="button"
                          className={`cosas-page__filter-chip${isActive ? ' is-active' : ''}`}
                          onClick={() => toggleFilter(group.key, option)}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              <button type="button" className="cosas-page__clear-filters" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </section>
          ) : null}
        </header>

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            const row = occupiedTopRows + Math.floor(index / columnCount) + 1
            const column = (index % columnCount) + 1

            return (
              <article
                key={project.id}
                className="cosas-page__entry"
                style={{
                  '--tile-delay': `${index * 70 + 160}ms`,
                }}
              >
              <button
                type="button"
                className="cosas-page__tile cosas-page__tile--image"
                onMouseEnter={() => openPreview(project.id)}
                onMouseLeave={schedulePreviewClose}
                onFocus={() => openPreview(project.id)}
                onBlur={schedulePreviewClose}
                onClick={() => openPreview(project.id)}
                aria-label={`Ver ventana de ${project.name}`}
              >
                <img src={project.cover} alt={project.name} />
                <div className="cosas-page__tile-top">
                  <span className="cosas-page__tile-kicker">{project.category}</span>
                  <span className="cosas-page__tile-number">{project.number}</span>
                </div>

                <div className="cosas-page__tile-bottom">
                  <strong className="cosas-page__tile-name">{project.name}</strong>
                  <span className="cosas-page__tile-coordinate">{`F${row} · C${column}`}</span>
                </div>
              </button>
              </article>
            )
          })
        ) : (
          <div className="cosas-page__empty">
            <h2>Sin resultados</h2>
            <p>Proba con otro nombre, categoria o material.</p>
          </div>
        )}
      </section>

      <aside
        className={`cosas-page__preview${activePreview ? ' is-active' : ''}`}
        onMouseEnter={clearPreviewClose}
        onMouseLeave={schedulePreviewClose}
      >
        {activePreview ? (
          <>
            <header className="cosas-page__preview-top">
              <div>
                <span>{activePreview.number}</span>
                <strong>{activePreview.name}</strong>
              </div>

              <button
                type="button"
                className="cosas-page__preview-close"
                onClick={() => setActivePreviewId(null)}
                aria-label="Cerrar vista"
              >
                x
              </button>
            </header>

            <div ref={previewScrollRef} className="cosas-page__preview-scroll">
              {activePreview.gallery.map((image, index) => (
                <img
                  key={`${activePreview.id}-${index}`}
                  src={image}
                  alt={`${activePreview.name} ${index + 1}`}
                />
              ))}
            </div>

            <footer className="cosas-page__preview-meta">
              <p>{activePreview.description}</p>
              <dl>
                <div>
                  <dt>Medidas</dt>
                  <dd>{activePreview.size}</dd>
                </div>
                <div>
                  <dt>Materiales</dt>
                  <dd>{activePreview.materials.join(', ')}</dd>
                </div>
              </dl>
            </footer>
          </>
        ) : null}
      </aside>
    </main>
  )
}

export default Cosas04Catalog
