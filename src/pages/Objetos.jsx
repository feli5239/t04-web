import SectionPage from './SectionPage'

const cards = [
  {
    title: 'Iluminacion',
    text: 'Objetos chicos, series cortas o piezas que complementan una obra mas grande.',
  },
  {
    title: 'Accesorios',
    text: 'Ideal para sumar bandejas, espejos, percheros o elementos de apoyo.',
  },
  {
    title: 'Ediciones',
    text: 'Podes marcar si son piezas disponibles, por encargo o una coleccion limitada.',
  },
  {
    title: 'Texturas',
    text: 'Tambien es buen lugar para mostrar materiales y terminaciones en primer plano.',
  },
]

function Objetos() {
  return (
    <SectionPage
      title="Objetos"
      intro="Una seccion pensada para piezas de menor escala. La composicion mantiene el tono editorial de la home, pero ya con contenido mas facil de ordenar."
      cards={cards}
    />
  )
}

export default Objetos
