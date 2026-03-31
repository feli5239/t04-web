import SectionPage from './SectionPage'
import heroImage from '../assets/brand/estudio04-hero.jpg'

const cards = [
  {
    title: 'Interiores',
    text: 'Podes mostrar proyectos completos, ambientaciones y transformaciones de espacios.',
  },
  {
    title: 'Dirección',
    text: 'Este bloque sirve para contar alcance, ubicación, año y tipo de encargo.',
  },
  {
    title: 'Materialidad',
    text: 'Ideal para explicar paletas, revestimientos, carpinterías y decisiones de proyecto.',
  },
  {
    title: 'Casos',
    text: 'Más adelante cada tarjeta puede transformarse en una ficha o página individual.',
  },
]

function Estudio04() {
  return (
    <SectionPage
      title="Estudio04"
      intro="La parte más espacial del universo T04. Ya queda lista para evolucionar hacia una presentación de proyectos con imágenes, textos cortos y recorrido claro."
      eyebrow="interiorismo y proyecto"
      cards={cards}
      heroImage={heroImage}
      heroAlt="Interior de cocina extraído de la carpeta de marca."
    />
  )
}

export default Estudio04
