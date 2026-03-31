import SectionPage from './SectionPage'

const cards = [
  {
    title: 'Residencial',
    text: 'Podes listar obras completas, reformas o ambientaciones de espacios habitados.',
  },
  {
    title: 'Comercial',
    text: 'Sirve para locales, showrooms, exhibiciones o montajes temporales.',
  },
  {
    title: 'Direccion',
    text: 'Este bloque puede resumir etapa, ubicacion, ano y alcance del trabajo.',
  },
  {
    title: 'Documentacion',
    text: 'Despues podes agregar fotos, planos o textos cortos por proyecto.',
  },
]

function Proyectos() {
  return (
    <SectionPage
      title="Proyectos"
      intro="Esta pagina ya te deja una base para mostrar espacios completos. Si queres, en la siguiente iteracion la podemos convertir en una grilla con imagenes reales."
      cards={cards}
    />
  )
}

export default Proyectos
