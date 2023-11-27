import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../redux/store/movies/moviesSlice';
import { Loader, MovieCard } from './index';
import { MovieCardType } from '../types/types';

const RenderMovies = ({ movies }: { movies: MovieCardType[] }): JSX.Element => {
  return (
    <div className='gap-2 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
      {movies.map((movie: any, index: number) => (
        <div key={index}>
          <MovieCard data={movie} type={'movie'} />
        </div>
      ))}
    </div>
  );
};

const RenderShows = ({ shows }: { shows: MovieCardType[] }): JSX.Element => {
  return (
    <div className='gap-2 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
      {shows.map((show: any, index: number) => (
        <div key={index}>
          <MovieCard data={show} type={'tv'} />
        </div>
      ))}
    </div>
  );
};

export const MoviesListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  return (
    <div className='movie-wrapper text-white'>
      <div className='movie-list'>
        <div className='text-5xl py-10'>Movies</div>
        {Object.keys(movies).length === 0 ? (
          <Loader />
        ) : (
          <RenderMovies movies={movies} />
        )}
      </div>
      <div className='show-list'>
        <div className='text-5xl my-10'>TV Shows</div>
        {Object.keys(shows).length === 0 ? (
          <Loader />
        ) : (
          <RenderShows shows={shows} />
        )}
      </div>
    </div>
  );
};
