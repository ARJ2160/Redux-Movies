import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../redux/store/movies/moviesSlice';
import { Loader, MovieCard } from './index';
import { MovieCardType } from '../types/types';

const RenderMovies = ({ movies }: { movies: MovieCardType[] }): JSX.Element => {
  console.log('>>', movies);
  if (Object.keys(movies).length > 0) {
    return (
      <div className='gap-2 grid grid-cols-1 md:grid-cols-6 sm:grid-cols-3'>
        {movies.map((movie: any, index: number) => (
          <MovieCard key={index} data={movie} />
        ))}
      </div>
    );
  } else {
    return <Loader />;
  }
};

const RenderShows = ({ shows }: { shows: MovieCardType[] }): JSX.Element => {
  console.log(">>", shows)
  if (Object.keys(shows).length > 0) {
    return (
      <div className='gap-2 grid grid-cols-1 md:grid-cols-6 sm:grid-cols-3'>
        {shows.map((show: any, index: number) => (
          <MovieCard key={index} data={show} />
        ))}
      </div>
    );
  } else {
    return <Loader />;
  }
};

export const MoviesListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  console.log('>>', shows);
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
