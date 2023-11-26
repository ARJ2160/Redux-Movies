import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../redux/store/movies/moviesSlice';
import { Loader, MovieCard } from './index';
import { MovieCardType } from '../types/types';

const RenderMovies = ({ movies }: { movies: MovieCardType }): JSX.Element => {
  if (movies.Response === 'True') {
    return (
      <div className='gap-2 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>
        {movies.Search.map((movie: any, index: number) => (
          <MovieCard key={index} data={movie} />
        ))}
      </div>
    );
  } else {
    return (
      <div className='movies-error'>
        <h3 style={{ color: 'white' }}>{movies.Error}</h3>
      </div>
    );
  }
};

const RenderShows = ({ shows }: { shows: MovieCardType }): JSX.Element => {
  if (shows.Response === 'True') {
    return (
      <div className='gap-2 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>
        {shows.Search.map((show: any, index: number) => (
          <MovieCard key={index} data={show} />
        ))}
      </div>
    );
  } else {
    return (
      <div className='movies-error'>
        <h3 style={{ color: 'white' }}>{shows.Error}</h3>
      </div>
    );
  }
};

export const MoviesListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  return (
    <div className='movie-wrapper text-white'>
      <div className='movie-list'>
        <div className='text-5xl pt-24 pb-10'>Movies</div>
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
