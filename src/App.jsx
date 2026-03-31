import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Taller04 from './pages/Taller04'
import TallerCatalogo from './pages/TallerCatalogo'
import TallerCatalogoDetalle from './pages/TallerCatalogoDetalle'
import TallerDisenemosJuntosAlbum from './pages/TallerDisenemosJuntosAlbum'
import TallerFormularioProyectual from './pages/TallerFormularioProyectual'
import Cosas04Catalog from './pages/Cosas04Catalog'
import Estudio04 from './pages/Estudio04'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/taller04" element={<Taller04 />} />
      <Route path="/taller04/catalogo" element={<TallerCatalogo />} />
      <Route path="/taller04/catalogo/:productId" element={<TallerCatalogoDetalle />} />
      <Route path="/taller04/disenemos-juntos" element={<TallerDisenemosJuntosAlbum />} />
      <Route
        path="/taller04/disenemos-juntos/formulario"
        element={<TallerFormularioProyectual />}
      />
      <Route
        path="/taller04/disenemos-juntos/encuesta"
        element={<TallerFormularioProyectual />}
      />
      <Route path="/taller04/proyectos" element={<TallerDisenemosJuntosAlbum />} />
      <Route path="/04cosas" element={<Cosas04Catalog />} />
      <Route path="/estudio04" element={<Estudio04 />} />
    </Routes>
  )
}

export default App
