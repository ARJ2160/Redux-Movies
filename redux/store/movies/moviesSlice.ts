import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../../common/movieApi';
import { APIKEY } from '../../../common/movieApiKey';

const initialState = {
  movies: [],
  shows: [],
  selectedMovies: [{}],
  searchTerm: ''
};

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const res = await movieApi.get(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
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
    const res = await movieApi.get(
      `/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    return res.data;
  }
);

export const fetchAsyncNavSearchData = createAsyncThunk(
  'movies/fetchNavSearchData',
  async (navSearch: string) => {
    const searchQuery = navSearch.split(' ').join('+');
    const movies = await movieApi.get(
      `search/movie?query=${searchQuery}&api_key=${APIKEY}`
    );
    const shows = await movieApi.get(
      `search/tv?query=${searchQuery}&api_key=${APIKEY}`
    );
    return { movie: movies.data.results, show: shows.data.results };
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
      state.selectedMovies = [{}];
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
export const getSelectedMovieorShow = (state: any) =>
  state.movies.selectedMovies;
export const searchTerm = (state: any) => state.movies.searchTerm;
export default movieSlice.reducer;
