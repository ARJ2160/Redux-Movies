import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Footer,
  Header,
  Home,
  MovieDetails,
  PageNotFound
} from '../components/index';
import { useEffect, useState } from 'react';
import { searchMovieHook } from '../utils/search';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieSearch, setMovieSearch] = useState<string>('');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const searchQuery = () => {
    searchMovieHook(movieSearch);
    setMovieSearch('');
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <div className='App'>
      <BrowserRouter>
        <Header
          isOpen={isOpen}
          toggle={toggle}
          movieSearch={movieSearch}
          setMovieSearch={setMovieSearch}
          searchQuery={searchQuery}
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:imdbID' element={<MovieDetails />} />
          <Route element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
