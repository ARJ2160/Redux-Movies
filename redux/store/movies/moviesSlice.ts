import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../../common/apis/movieApi';
import { APIKEY } from '../../../common/apis/movieApiKey';

const initialState = {
  movies: {},
  shows: {},
  selectedMovies: {},
  loadingMovies: false,
  searchTerm: {}
};

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const res = await movieApi.get(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
    console.log('>>', res);
    return res.data;
  }
);

export const fetchAsyncSeries = createAsyncThunk(
  'movies/fetchAsyncSeries',
  async () => {
    const res = await movieApi.get(
      `/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
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
    const movies = await movieApi.get(
      `?apikey=${APIKEY}&s=${navSearch}&type=movie`
    );
    const shows = await movieApi.get(
      `?apikey=${APIKEY}&s=${navSearch}&type=series`
    );
    return { movie: movies.data, show: shows.data };
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
    [fetchAsyncMovies.pending as any]: state => {
      return { ...state, loading: true };
    },
    [fetchAsyncMovies.fulfilled as any]: (state, { payload }) => {
      return { ...state, movies: payload.results };
    },
    [fetchAsyncMovies.rejected as any]: () => {
      console.log('Rejected');
    },
    [fetchAsyncSeries.fulfilled as any]: (state, { payload }) => {
      return { ...state, shows: payload.results };
    },
    [fetchAsyncMovieorShowDetail.fulfilled as any]: (state, { payload }) => {
      return { ...state, selectedMovies: payload };
    },
    [fetchAsyncNavSearchData.fulfilled as any]: (state, { payload }) => {
      return { ...state, movies: payload.movie, shows: payload.show };
    }
  }
});

export const { removeSelectedMovieorShow, searchMovies } = movieSlice.actions;
export const getAllMovies = (state: any) => state.movies.movies;
export const getAllShows = (state: any) => state.movies.shows;
export const isLoadingShows = (state: any) => state.movies.loadingMovies;
export const getSelectedMovieorShow = (state: any) =>
  state.movies.selectedMovies;
export const searchTerm = (state: any) => state.movies.searchTerm;
export default movieSlice.reducer;
