import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../../common/apis/movieApi';
import APIKEY from '../../../common/apis/movieApiKey';

const initialState = {
  movies: {},
  shows: {},
  selectedMovies: {},
  searchTerm: {}
};

const movieText = 'Harry Potter';
const seriesText = 'Anime';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const res = await movieApi.get(
      `?apikey=${APIKEY}&s=${movieText}&type=movie`
    );
    return res.data;
  }
);

export const fetchAsyncSeries = createAsyncThunk(
  'movies/fetchAsyncSeries',
  async () => {
    const res = await movieApi.get(
      `?apikey=${APIKEY}&s=${seriesText}&type=series`
    );
    return res.data;
  }
);

export const fetchAsyncMovieorShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieorShowDetail',
  async (id: string | undefined) => {
    const res = await movieApi.get(`?apikey=${APIKEY}&i=${id}&Plot=full`);
    return res.data;
  }
);

export const fetchAsyncNavSearchData = createAsyncThunk(
  'movies/fetchNavSearchData',
  async (navSearch: string) => {
    const res = await movieApi.get(`?apikey=${APIKEY}&s=${navSearch}`);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    searchMovies: (state, { payload }) => {
      state.searchTerm = payload;
    },
    removeSelectedMovieorShow: state => {
      state.selectedMovies = {};
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending as any]: () => {
      console.log('Pending');
    },
    [fetchAsyncMovies.fulfilled as any]: (state, { payload }) => {
      console.log('Fullfilled');
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected as any]: () => {
      console.log('Rejected');
    },
    [fetchAsyncSeries.fulfilled as any]: (state, { payload }) => {
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieorShowDetail.fulfilled as any]: (state, { payload }) => {
      return { ...state, selectedMovies: payload };
    },
    [fetchAsyncNavSearchData.fulfilled as any]: (state, { payload }) => {
      return { ...state, movies: payload };
    }
  }
});

export const { removeSelectedMovieorShow, searchMovies } = movieSlice.actions;
export const getAllMovies = (state: any) => state.movies.movies;
export const getAllShows = (state: any) => state.movies.shows;
export const getSelectedMovieorShow = (state: any) =>
  state.movies.selectedMovies;
export const searchTerm = (state: any) => state.movies.searchTerm;
export default movieSlice.reducer;
