import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/index';
import Random from './pages/Random';
import Search from './pages/search';
import About from './pages/about';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
