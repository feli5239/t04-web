import heroImage from '../assets/brand/taller04-hero.jpg'
import image01 from '../assets/brand/hover/taller04-01.jpg'
import image02 from '../assets/brand/hover/taller04-02.jpg'
import image03 from '../assets/brand/hover/taller04-03.jpg'
import image04 from '../assets/brand/hover/taller04-04.jpg'
import image05 from '../assets/brand/hover/taller04-05.jpg'

export const tallerCatalogProducts = [
  {
    id: 'mesa-plano-04',
    name: 'Mesa Plano 04',
    type: 'Mesa de comedor',
    category: 'Mesas',
    materials: ['Madera maciza', 'Metal'],
    colors: ['Natural', 'Negro'],
    image: image01,
    gallery: [image01, image02, image03],
    material: 'Madera maciza y estructura metálica',
    size: '180 x 90 x 75 cm',
    stockCount: 0,
    listNote: 'Mesa central para espacios de encuentro y uso diario.',
    description:
      'Mesa desarrollada para comedores y espacios de reunión, con una presencia sobria y una lógica material muy precisa. La pieza puede variar en terminación, estructura y proporción manteniendo la misma identidad general.',
    highlights: [
      'Resolución estructural limpia y silenciosa.',
      'Terminaciones posibles en madera natural o tonos oscuros.',
      'Apta para versiones de seis u ocho puestos.',
    ],
  },
  {
    id: 'modulo-linea-04',
    name: 'Módulo Línea 04',
    type: 'Guardado y biblioteca',
    category: 'Guardado',
    materials: ['Enchapado natural', 'Hierro', 'Laca'],
    colors: ['Natural', 'Blanco'],
    image: image02,
    gallery: [image02, image04, image01],
    material: 'Enchapado natural, hierro pintado y laca',
    size: '240 x 42 x 210 cm',
    stockCount: 0,
    listNote: 'Sistema modular para archivo, objetos y biblioteca.',
    description:
      'Sistema de guardado modular con variantes abiertas y cerradas, pensado para integrar libros, piezas y archivo doméstico. La composición puede crecer en ancho o altura manteniendo la misma retícula.',
    highlights: [
      'Combina sectores abiertos y cerrados.',
      'Pensado para living, estudio o comedor.',
      'Admite variaciones de color y ritmo frontal.',
    ],
  },
  {
    id: 'banco-taller-04',
    name: 'Banco Taller 04',
    type: 'Asiento auxiliar',
    category: 'Asientos',
    materials: ['Madera maciza', 'Tapizado', 'Metal'],
    colors: ['Terracota', 'Negro'],
    image: image03,
    gallery: [image03, image05, image01],
    material: 'Madera maciza, tapizado y base metálica',
    size: '120 x 42 x 45 cm',
    stockCount: 3,
    listNote: 'Banco versátil para acceso, comedor o pie de cama.',
    description:
      'Banco compacto y versátil pensado para acompañar diferentes usos domésticos. La estructura liviana y el tapizado permiten una pieza de presencia medida pero con buena resistencia de uso.',
    highlights: [
      'Formato útil para varios ambientes.',
      'Tapizados en distintos tonos y texturas.',
      'Muy buen rendimiento en circulaciones y apoyos rápidos.',
    ],
  },
  {
    id: 'aparador-nodo-04',
    name: 'Aparador Nodo 04',
    type: 'Guardado bajo',
    category: 'Guardado',
    materials: ['MDF laqueado', 'Petiribí', 'Herrería'],
    colors: ['Rojo', 'Natural'],
    image: image04,
    gallery: [image04, image02, image05],
    material: 'MDF laqueado, petiribí y herrería',
    size: '200 x 48 x 78 cm',
    stockCount: 0,
    listNote: 'Guardado bajo con frente limpio y presencia contenida.',
    description:
      'Aparador de líneas limpias con foco en proporción, guardado funcional y resolución precisa de detalles. Funciona bien como pieza de apoyo en comedores, livings o estudios.',
    highlights: [
      'Frente continuo y lectura material clara.',
      'Buen equilibrio entre guardado y visual liviano.',
      'Opciones de color en estructura y plano superior.',
    ],
  },
  {
    id: 'mesa-lateral-04',
    name: 'Mesa lateral 04',
    type: 'Apoyo',
    category: 'Apoyos',
    materials: ['Roble', 'Chapa doblada', 'Laca'],
    colors: ['Natural', 'Azul'],
    image: image05,
    gallery: [image05, image03, image04],
    material: 'Roble, chapa doblada y laca poliuretánica',
    size: '55 x 55 x 50 cm',
    stockCount: 2,
    listNote: 'Mesa auxiliar compacta para living o dormitorio.',
    description:
      'Mesa lateral diseñada para resolver apoyos chicos con una presencia material fuerte. La combinación entre madera y chapa doblada construye una pieza contenida pero expresiva.',
    highlights: [
      'Muy buena para livings de escala doméstica.',
      'Lectura simple y geométrica.',
      'Puede convivir sola o en pares.',
    ],
  },
  {
    id: 'isla-taller-04',
    name: 'Isla Taller 04',
    type: 'Cocina y trabajo',
    category: 'Cocinas',
    materials: ['Madera', 'Piedra natural', 'Metal'],
    colors: ['Natural', 'Gris'],
    image: heroImage,
    gallery: [heroImage, image01, image02],
    material: 'Madera, piedra natural y estructura metálica',
    size: '220 x 95 x 92 cm',
    stockCount: 0,
    listNote: 'Isla para cocinar, apoyar y reunir en una sola pieza.',
    description:
      'Pieza desarrollada para cocinar, apoyar y reunir, con opciones de guardado y materialidad según el espacio. Se piensa como núcleo de trabajo y encuentro dentro de la cocina.',
    highlights: [
      'Integra preparación, guardado y apoyo.',
      'Materialidad adaptable según proyecto.',
      'Buena lectura central dentro del ambiente.',
    ],
  },
]

export function normalizeCatalogText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function getCatalogFilterOptions(key) {
  return [...new Set(tallerCatalogProducts.flatMap((product) => product[key]))]
}

export function getCatalogProductStatus(product) {
  return product.stockCount > 0 ? 'En stock' : 'Por encargo'
}

export function getCatalogProductById(id) {
  return tallerCatalogProducts.find((product) => product.id === id) ?? null
}

export const catalogFilterGroups = [
  { key: 'category', label: 'Categorías', options: getCatalogFilterOptions('category') },
  { key: 'materials', label: 'Materiales', options: getCatalogFilterOptions('materials') },
  { key: 'colors', label: 'Colores', options: getCatalogFilterOptions('colors') },
]
