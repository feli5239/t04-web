import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { tallerProjectAlbum } from '../data/tallerProjects'

const FORM_RECIPIENT_PLACEHOLDER = '04.taller.04@gmail.com'

const initialForm = {
  fullName: '',
  contactEmail: '',
  contactPhone: '',
  projectDescription: '',
  houseArea: '',
  zone: '',
  dimensions: '',
  materials: '',
  lighting: '',
  references: [],
  extraNotes: '',
  spacePhotoName: '',
  aestheticPhotoName: '',
  measuresPhotoName: '',
}

function TallerFormularioProyectual() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [statusFlashing, setStatusFlashing] = useState(false)
  const flashTimeoutRef = useRef(null)

  const requiredTextFields = [
    form.fullName,
    form.contactEmail,
    form.contactPhone,
    form.projectDescription,
    form.houseArea,
    form.zone,
    form.dimensions,
    form.materials,
    form.extraNotes,
  ]

  const isTextComplete = requiredTextFields.every((value) => value.trim() !== '')
  const areFilesComplete =
    form.spacePhotoName !== '' ||
    form.aestheticPhotoName !== '' ||
    form.measuresPhotoName !== ''
  const isFormComplete = isTextComplete && areFilesComplete

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current)
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

    navigate('/taller04/disenemos-juntos')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleReferenceToggle = (projectId) => {
    setForm((current) => ({
      ...current,
      references: current.references.includes(projectId)
        ? current.references.filter((item) => item !== projectId)
        : [...current.references, projectId],
    }))
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    const fileName = files && files.length > 0 ? files[0].name : ''
    setForm((current) => ({ ...current, [name]: fileName }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isFormComplete) {
      setStatusFlashing(false)
      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current)
      }

      window.requestAnimationFrame(() => {
        setStatusFlashing(true)
      })

      flashTimeoutRef.current = window.setTimeout(() => {
        setStatusFlashing(false)
      }, 1800)

      return
    }

    const selectedProjects = tallerProjectAlbum
      .filter((project) => form.references.includes(project.id))
      .map((project) => `${project.number} - ${project.name}`)

    const subject = `Formulario proyectual Taller04 - ${form.fullName}`
    const body = [
      'Formulario proyectual Taller04',
      '',
      `Nombre: ${form.fullName || '-'}`,
      `Mail de contacto: ${form.contactEmail || '-'}`,
      `Telefono / WhatsApp: ${form.contactPhone || '-'}`,
      '',
      `Descripcion general: ${form.projectDescription || '-'}`,
      `Lugar de la casa: ${form.houseArea || '-'}`,
      `Zona: ${form.zone || '-'}`,
      `Medidas: ${form.dimensions || '-'}`,
      `Materiales de interes: ${form.materials || '-'}`,
      `Incluye iluminacion: ${form.lighting || '-'}`,
      `Referencias de proyectos: ${selectedProjects.join(', ') || 'Ninguna'}`,
      `Algo mas para especificar: ${form.extraNotes || '-'}`,
      '',
      'Archivos para adjuntar manualmente al mail:',
      `Foto del espacio: ${form.spacePhotoName || '-'}`,
      `Referencia estetica: ${form.aestheticPhotoName || '-'}`,
      `Medidas o dibujo a mano: ${form.measuresPhotoName || '-'}`,
    ].join('\n')

    window.location.href = `mailto:${FORM_RECIPIENT_PLACEHOLDER}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="page survey-page">
      <button
        type="button"
        className="page__back-zone"
        onClick={handleBack}
        aria-label="Volver atras"
      />

      <section className="page__panel survey-page__panel">
        <button type="button" className="page__back page__back--taller" onClick={handleBack}>
          Volver
        </button>

        <div className="survey-page__intro">
          <p className="survey-page__eyebrow">Taller04 / formulario proyectual</p>
          <h1>Mostranos tu idea.</h1>
        </div>

        <form className="survey-page__form" onSubmit={handleSubmit}>
          <div className="survey-page__form-grid">
            <label className="survey-page__field">
              <span>Nombre y apellido</span>
              <input
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Como te llamas"
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Mail de contacto</span>
              <input
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="tu mail"
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Telefono o WhatsApp</span>
              <input
                name="contactPhone"
                type="text"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="Numero de contacto"
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Zona</span>
              <input
                name="zone"
                type="text"
                value={form.zone}
                onChange={handleChange}
                placeholder="Barrio, ciudad o zona"
                required
              />
            </label>

            <label className="survey-page__field survey-page__field--wide">
              <span>Descripcion del proyecto</span>
              <textarea
                name="projectDescription"
                value={form.projectDescription}
                onChange={handleChange}
                placeholder="Contanos brevemente que queres resolver y cualquier detalle que te parezca importante."
                rows="4"
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Lugar de la casa</span>
              <input
                name="houseArea"
                type="text"
                value={form.houseArea}
                onChange={handleChange}
                placeholder="Living, cocina, dormitorio, patio..."
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Medidas</span>
              <input
                name="dimensions"
                type="text"
                value={form.dimensions}
                onChange={handleChange}
                placeholder="Ancho, profundidad, alto"
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Materiales de interes</span>
              <input
                name="materials"
                type="text"
                value={form.materials}
                onChange={handleChange}
                placeholder="Melaminico, madera, carpintera, multiplaca, laca..."
                required
              />
            </label>

            <label className="survey-page__field">
              <span>Incluye iluminacion</span>
              <select name="lighting" value={form.lighting} onChange={handleChange}>
                <option value="">Opcional</option>
                <option>A definir</option>
                <option>Si</option>
                <option>No</option>
              </select>
            </label>

            <fieldset className="survey-page__field survey-page__field--wide survey-page__field-set">
              <legend>Referencias de proyectos</legend>
              <p className="survey-page__hint">
                Si queres, relaciona tu idea con nuestros proyectos.
              </p>

              <div className="survey-page__check-grid">
                {tallerProjectAlbum.map((project) => (
                  <label
                    key={project.id}
                    className={`survey-page__reference-card${
                      form.references.includes(project.id) ? ' is-active' : ''
                    }`}
                  >
                    <input
                      className="survey-page__reference-input"
                      type="checkbox"
                      checked={form.references.includes(project.id)}
                      onChange={() => handleReferenceToggle(project.id)}
                    />
                    <span className="survey-page__reference-number">{project.number}</span>
                    <span className="survey-page__reference-name">{project.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="survey-page__field survey-page__field--wide survey-page__field-set">
              <legend>Adjuntos</legend>
              <p className="survey-page__hint">
                Idealmente suma una del espacio, una referencia estetica y una de
                medidas o dibujo a mano.
              </p>

              <div className="survey-page__upload-grid">
                <label className="survey-page__upload-card">
                  <span className="survey-page__upload-kicker">01</span>
                  <strong>Foto del espacio</strong>
                  <p>Una imagen del lugar donde se va a instalar.</p>
                  <em>{form.spacePhotoName || 'Elegir archivo'}</em>
                  <input
                    className="survey-page__upload-input"
                    name="spacePhotoName"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>

                <label className="survey-page__upload-card">
                  <span className="survey-page__upload-kicker">02</span>
                  <strong>Referencia estetica</strong>
                  <p>Una imagen que muestre el clima o lenguaje que buscan.</p>
                  <em>{form.aestheticPhotoName || 'Elegir archivo'}</em>
                  <input
                    className="survey-page__upload-input"
                    name="aestheticPhotoName"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>

                <label className="survey-page__upload-card">
                  <span className="survey-page__upload-kicker">03</span>
                  <strong>Medidas o dibujo</strong>
                  <p>Puede ser una foto con medidas, croquis o dibujo a mano.</p>
                  <em>{form.measuresPhotoName || 'Elegir archivo'}</em>
                  <input
                    className="survey-page__upload-input"
                    name="measuresPhotoName"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </fieldset>

            <label className="survey-page__field survey-page__field--wide">
              <span>Algo mas para especificar</span>
              <textarea
                name="extraNotes"
                value={form.extraNotes}
                onChange={handleChange}
                placeholder="Observaciones extra, fotos, texturas, plazos, proveedores o cualquier dato util."
                rows="3"
                required
              />
            </label>
          </div>

          <div className="survey-page__actions">
            <Link to="/taller04/disenemos-juntos" className="survey-page__secondary">
              Volver a proyectos
            </Link>

            <button type="submit" className="survey-page__primary">
              Enviar formulario
            </button>
          </div>

          <p
            className={`survey-page__status${statusFlashing ? ' is-flashing' : ''}`}
            aria-live="polite"
          >
            {isFormComplete
              ? 'Formulario completo y listo para enviar.'
              : 'Completa todos los campos de texto y al menos 1 adjunto.'}
          </p>

          <p className="survey-page__footnote">
            Al enviar se abre un mail a 04.taller.04@gmail.com con toda la informacion.
            Los archivos elegidos quedan listados y despues los adjuntas manualmente en ese mail.
          </p>
        </form>
      </section>
    </main>
  )
}

export default TallerFormularioProyectual
