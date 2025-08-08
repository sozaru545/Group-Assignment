import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './views/index'
import Random from './views/Random'
import Search from './views/search'
import About from './views/about'
import SongDetail from './views/SongDetail'
import ArtistDetail from './views/ArtistDetail'
import NotFound from './views/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/random"        element={<Random />} />
        <Route path="/search"        element={<Search />} />
        <Route path="/about"         element={<About />} />
        <Route path="/song/:id"      element={<SongDetail />} />
        <Route path="/artist/:artistName" element={<ArtistDetail />} />
        <Route path="*"              element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
