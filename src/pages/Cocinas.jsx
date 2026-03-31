import SectionPage from './SectionPage'

const cards = [
  {
    title: 'Modulos',
    text: 'Podes separar cocinas lineales, en L o integradas con comedor y living.',
  },
  {
    title: 'Materialidad',
    text: 'Este bloque sirve para hablar de melaminas, laqueados, piedra o acero.',
  },
  {
    title: 'Detalles',
    text: 'Tambien funciona para mostrar herrajes, tiradores ocultos y criterios tecnicos.',
  },
  {
    title: 'Antes y despues',
    text: 'Una forma clara de contar transformaciones y decisiones de proyecto.',
  },
]

function Cocinas() {
  return (
    <SectionPage
      title="Cocinas"
      intro="Esta categoria ya puede alojar ejemplos y texto real. Mas adelante podes convertir cada tarjeta en un caso de estudio o una pagina individual."
      cards={cards}
    />
  )
}

export default Cocinas
