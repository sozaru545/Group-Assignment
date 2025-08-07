import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/index';
import Random from './pages/Random';
import Search from './pages/search';
import About from './pages/about';
import SongDetail from './pages/SongDetail';
import ArtistDetail from './pages/ArtistDetail';
import NotFound from './pages/NotFound'; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/song/:id" element={<SongDetail />} />
        <Route path="/artist/:artistName" element={<ArtistDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
