import React, { useEffect } from 'react';
import { MovieCarousel, MoviesListing } from './index';
import {
  fetchAsyncMovies,
  fetchAsyncSeries
} from '../redux/store/movies/moviesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncSeries());
  }, [dispatch]);

  return (
    <React.Fragment>
      <MovieCarousel />
      <div className='w-full banner-img px-10 py-4 bg-[#0F171E]'>
        <MoviesListing />
      </div>
    </React.Fragment>
  );
};
