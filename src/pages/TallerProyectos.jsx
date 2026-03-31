import SectionPage from './SectionPage'
import heroImage from '../assets/brand/taller04-hero.jpg'

const cards = [
  {
    title: 'Proceso',
    text: 'Una entrada para mostrar bocetos, decisiones técnicas, pruebas de taller y evolución de cada pieza.',
  },
  {
    title: 'Proyectos a medida',
    text: 'Ideal para encargos desarrollados junto al cliente, con foco en uso, escala y resolución material.',
  },
  {
    title: 'Obra y montaje',
    text: 'Buen lugar para documentar fabricación, ajustes en sitio, entregas y puesta en espacio.',
  },
  {
    title: 'Archivo',
    text: 'Después puede crecer con fichas por proyecto, imágenes finales y pequeños relatos de cada caso.',
  },
]

function TallerProyectos() {
  return (
    <SectionPage
      title="Proyectos"
      intro="Un recorrido por procesos, desarrollos a medida y trabajos donde Taller04 acompaña desde la idea hasta la resolución final."
      eyebrow="Taller04 / proyectos"
      cards={cards}
      heroImage={heroImage}
      heroAlt="Proyecto de Taller04."
    />
  )
}

export default TallerProyectos
