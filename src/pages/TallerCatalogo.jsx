import { useDeferredValue, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  catalogFilterGroups,
  normalizeCatalogText,
  tallerCatalogProducts,
} from '../data/tallerCatalog'

function TallerCatalogo() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    materials: null,
    colors: null,
  })
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = normalizeCatalogText(deferredQuery.trim())

  const filteredProducts = tallerCatalogProducts.filter((product) => {
    const matchesQuery =
      normalizedQuery === '' ||
      normalizeCatalogText(
        [
          product.name,
          product.type,
          product.category,
          product.material,
          product.size,
          product.listNote,
          ...product.materials,
          ...product.colors,
        ].join(' '),
      ).includes(normalizedQuery)

    const matchesCategory =
      activeFilters.category === null || product.category === activeFilters.category
    const matchesMaterial =
      activeFilters.materials === null || product.materials.includes(activeFilters.materials)
    const matchesColor =
      activeFilters.colors === null || product.colors.includes(activeFilters.colors)

    return matchesQuery && matchesCategory && matchesMaterial && matchesColor
  })

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length

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
      colors: null,
    })
  }

  return (
    <main className="page catalog-page">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atrás"
      />

      <div className="page__panel catalog-page__panel">
        <button type="button" className="page__back" onClick={handleBack}>
          Volver
        </button>

        <div className="catalog-page__toolbar">
          <label className="catalog-page__search">
            <span className="catalog-page__search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" />
                <path d="M16 16l4.5 4.5" fill="none" stroke="currentColor" />
              </svg>
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, uso o material"
              aria-label="Buscar productos"
            />
          </label>

          <button
            type="button"
            className="catalog-page__filters-toggle"
            onClick={() => setFiltersOpen((current) => !current)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
          >
            Filtros
            {activeFilterCount > 0 ? (
              <span className="catalog-page__filters-count">{activeFilterCount}</span>
            ) : null}
          </button>
        </div>

        {filtersOpen ? (
          <section id="catalog-filters" className="catalog-page__filters" aria-label="Filtros">
            {catalogFilterGroups.map((group) => (
              <div key={group.key} className="catalog-page__filter-group">
                <h2>{group.label}</h2>

                <div className="catalog-page__filter-options">
                  {group.options.map((option) => {
                    const isActive = activeFilters[group.key] === option

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`catalog-page__filter-chip${isActive ? ' is-active' : ''}`}
                        onClick={() => toggleFilter(group.key, option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="catalog-page__clear-filters"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </section>
        ) : null}

        <p className="catalog-page__results">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          {deferredQuery.trim() ? ` para "${deferredQuery.trim()}"` : ''}
        </p>

        {filteredProducts.length > 0 ? (
          <ul className="catalog-page__list">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/taller04/catalogo/${product.id}`}
                  className="catalog-page__item"
                  aria-label={`Ver ficha de ${product.name}`}
                >
                  <div className="catalog-page__media">
                    <img
                      className="catalog-page__image"
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="catalog-page__sheet" aria-hidden="true">
                      <div className="catalog-page__sheet-block">
                        <span className="catalog-page__sheet-label">Medidas</span>
                        <strong className="catalog-page__sheet-value">{product.size}</strong>
                      </div>

                      <div className="catalog-page__sheet-block">
                        <span className="catalog-page__sheet-label">Materiales</span>
                        <strong className="catalog-page__sheet-value">{product.material}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="catalog-page__content">
                    <div className="catalog-page__top">
                      <div>
                        <h2>{product.name}</h2>
                        <p className="catalog-page__category">{product.category}</p>
                      </div>

                      {product.stockCount > 0 ? (
                        <span className="catalog-page__badge">En stock</span>
                      ) : null}
                    </div>

                    <p className="catalog-page__list-note">{product.listNote}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="catalog-page__empty">
            <h2>Sin resultados</h2>
            <p>Probá buscar por nombre, material, color o categoría.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default TallerCatalogo
