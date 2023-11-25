import { fetchAsyncNavSearchData } from '../redux/store/movies/moviesSlice';
import { AppDispatch } from './../redux/store/store';
import { useDispatch } from 'react-redux';

export const searchMovieHook = (searchTerm: string) => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(fetchAsyncNavSearchData(searchTerm));
};
