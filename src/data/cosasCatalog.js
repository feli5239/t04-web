import heroImage from '../assets/brand/04cosas-hero.jpg'
import cardBlue from '../assets/brand/card-blue.jpg'
import cardYellow from '../assets/brand/card-yellow.jpg'
import tabletMockup from '../assets/brand/tablet-mockup.jpg'
import image01 from '../assets/brand/hover/04cosas-01.jpg'
import image02 from '../assets/brand/hover/04cosas-02.jpg'
import image03 from '../assets/brand/hover/04cosas-03.jpg'
import image04 from '../assets/brand/hover/04cosas-04.jpg'
import image05 from '../assets/brand/hover/04cosas-05.jpg'

export const cosasCatalogProjects = [
  {
    id: 'lampara-aro-04',
    number: '01',
    name: 'Lampara Aro 04',
    category: 'Iluminacion',
    materials: ['Acrilico', 'Madera laqueada'],
    size: '28 x 28 x 42 cm',
    description: 'Luminaria de mesa con lectura grafica y presencia suave.',
    entryCols: 6,
    entryRows: 1,
    cover: heroImage,
    gallery: [heroImage, image02, cardYellow],
  },
  {
    id: 'bandeja-nodo-04',
    number: '02',
    name: 'Bandeja Nodo 04',
    category: 'Mesa',
    materials: ['Madera', 'Laca'],
    size: '38 x 24 x 4 cm',
    description: 'Pieza de apoyo para mesa, cocina o biblioteca.',
    entryCols: 3,
    entryRows: 1,
    cover: image01,
    gallery: [image01, cardBlue, image03],
  },
  {
    id: 'revistero-marco-04',
    number: '03',
    name: 'Revistero Marco 04',
    category: 'Guardado',
    materials: ['Multiplaca', 'Laca'],
    size: '36 x 18 x 42 cm',
    description: 'Guardado liviano para revistas, carpetas y papeles sueltos.',
    entryCols: 3,
    entryRows: 1,
    cover: image03,
    gallery: [image03, image05, tabletMockup],
  },
  {
    id: 'perchero-linea-04',
    number: '04',
    name: 'Perchero Linea 04',
    category: 'Accesorio',
    materials: ['Madera', 'Carpinteria laqueada'],
    size: '64 x 8 x 18 cm',
    description: 'Perchero de muro para accesos chicos y circulaciones.',
    entryCols: 3,
    entryRows: 1,
    cover: image04,
    gallery: [image04, heroImage, cardBlue],
  },
  {
    id: 'organizador-trama-04',
    number: '05',
    name: 'Organizador Trama 04',
    category: 'Guardado',
    materials: ['Melaminico', 'Laca'],
    size: '30 x 20 x 16 cm',
    description: 'Contenedor de escritorio para ordenar objetos cotidianos.',
    entryCols: 3,
    entryRows: 1,
    cover: image02,
    gallery: [image02, image01, cardYellow],
  },
  {
    id: 'apoyo-pixel-04',
    number: '06',
    name: 'Apoyo Pixel 04',
    category: 'Mesa',
    materials: ['Madera', 'Multiplaca'],
    size: '44 x 44 x 46 cm',
    description: 'Apoyo lateral pensado para convivir solo o en pares.',
    entryCols: 6,
    entryRows: 1,
    cover: image05,
    gallery: [image05, image04, tabletMockup],
  },
  {
    id: 'repisa-punto-04',
    number: '07',
    name: 'Repisa Punto 04',
    category: 'Muro',
    materials: ['Carpinteria', 'Laca'],
    size: '72 x 18 x 24 cm',
    description: 'Repisa de muro para objetos chicos y piezas de coleccion.',
    entryCols: 3,
    entryRows: 1,
    cover: cardYellow,
    gallery: [cardYellow, image02, heroImage],
  },
  {
    id: 'lampara-plano-04',
    number: '08',
    name: 'Lampara Plano 04',
    category: 'Iluminacion',
    materials: ['Acrilico', 'Melaminico'],
    size: '24 x 24 x 36 cm',
    description: 'Lampara compacta con una geometria mas frontal y domestica.',
    entryCols: 3,
    entryRows: 1,
    cover: cardBlue,
    gallery: [cardBlue, image01, image03],
  },
]

export const cosasCatalogFilterGroups = [
  {
    key: 'category',
    label: 'Categorias',
    options: [...new Set(cosasCatalogProjects.map((project) => project.category))],
  },
  {
    key: 'materials',
    label: 'Materiales',
    options: [...new Set(cosasCatalogProjects.flatMap((project) => project.materials))],
  },
]

export function normalizeCosasText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
