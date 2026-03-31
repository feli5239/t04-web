import SectionPage from './SectionPage'
import heroImage from '../assets/brand/04cosas-hero.jpg'

const cards = [
  {
    title: 'Objetos',
    text: 'Buen lugar para piezas chicas, ediciones cortas o productos que puedan vivir solos.',
  },
  {
    title: 'Colecciones',
    text: 'Podés agrupar lanzamientos por temporada, material o familia formal.',
  },
  {
    title: 'Disponibles',
    text: 'También puede funcionar como una sección más comercial para objetos ya listos.',
  },
  {
    title: 'Escala doméstica',
    text: 'Sirve para mostrar como cada pieza entra en una escena cotidiana o interior.',
  },
]

function Cosas04() {
  return (
    <SectionPage
      title="04Cosas"
      intro="Una categoría para objetos, piezas y pequeñas series. Si después querés, esta puede ser la sección con más aire editorial y más foco en producto."
      eyebrow="objetos y piezas"
      cards={cards}
      heroImage={heroImage}
      heroAlt="Luminaria geométrica extraída de la carpeta de marca."
    />
  )
}

export default Cosas04
