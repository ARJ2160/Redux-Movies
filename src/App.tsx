import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Footer,
  Header,
  Home,
  MovieDetails,
  PageNotFound
} from '../components/index';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { fetchAsyncNavSearchData } from '../redux/store/movies/moviesSlice';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieSearch, setMovieSearch] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const searchQuery = () => {
    dispatch(fetchAsyncNavSearchData(movieSearch));
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
