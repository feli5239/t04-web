import SectionPage from './SectionPage'

const cards = [
  {
    title: 'Email',
    text: 'Aca podes poner un correo real, por ejemplo hola@t04estudio.com.',
  },
  {
    title: 'Instagram',
    text: 'Tambien podes sumar la red principal donde muestres avances y obras terminadas.',
  },
  {
    title: 'Ubicacion',
    text: 'Si te sirve, podes indicar ciudad o zona sin entrar en demasiados detalles.',
  },
  {
    title: 'Encargos',
    text: 'Buen lugar para explicar brevemente que tipo de consultas o proyectos recibis.',
  },
]

function Contacto() {
  return (
    <SectionPage
      title="Contacto"
      intro="Por ahora queda simple y funcional. Cuando quieras, la pasamos a una version mas profesional con formulario, links reales y datos definitivos."
      cards={cards}
    />
  )
}

export default Contacto
