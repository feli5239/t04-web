import SectionPage from './SectionPage'

const cards = [
  {
    title: 'Bibliotecas',
    text: 'Lugar ideal para mostrar sistemas de guardado, madera, hierro y terminaciones.',
  },
  {
    title: 'Mesas',
    text: 'Despues podes reemplazar este texto con medidas, materiales, fotos y variantes.',
  },
  {
    title: 'Piezas especiales',
    text: 'Sirve para destacar encargos unicos o muebles hechos para un espacio puntual.',
  },
  {
    title: 'Proceso',
    text: 'Tambien podes contar como pensas, dibujas y fabricas cada pieza.',
  },
]

function Mobiliario() {
  return (
    <SectionPage
      title="Mobiliario"
      intro="Una pagina simple para empezar a cargar proyectos reales. La estructura ya queda lista para convertirla despues en fichas, galerias o una grilla mas refinada."
      cards={cards}
    />
  )
}

export default Mobiliario
