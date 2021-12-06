import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import movieApi from "../../common/apis/movieapi"
import APIKEY from "../../common/apis/movieapikey"

const initialState = {
    movies: {},
    shows: {},
    selectedMovies: {},
    searchTerm: {}
}

const movieText = "Harry Potter"
const seriesText = "Game of Thrones"

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
        const res = await movieApi
        .get(`?apikey=${APIKEY}&s=${movieText}&type=movie`)
        return res.data
    }
)

export const fetchAsyncSeries = createAsyncThunk(
    "movies/fetchAsyncSeries",
    async () => {
        const res = await movieApi
        .get(`?apikey=${APIKEY}&s=${seriesText}&type=series`)
        return res.data
    }
)

export const fetchAsyncMovieorShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieorShowDetail",
    async id => {
        const res = await movieApi
        .get(`?apikey=${APIKEY}&i=${id}&Plot=full`)
        return res.data
    }
)

export const fetchAsyncNavSearchData = createAsyncThunk(
    "movies/fetchNavSearchData",
    async navSearch => {
        const res = await movieApi
        .get(`?apikey=${APIKEY}&s=${navSearch}`)
        return res.data
    }
)

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        searchMovies: (state, { payload }) => {
            state.searchTerm = payload
        },
        removeSelectedMovieorShow: (state) => {
            state.selectedMovies = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fullfilled");
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected")
        },
        [fetchAsyncSeries.fulfilled]: (state, { payload }) => {
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieorShowDetail.fulfilled]: (state, { payload }) => {
            return { ...state, selectedMovies: payload }
        },
        [fetchAsyncNavSearchData.fulfilled]: (state, { payload }) => {
            return { ...state, movies: payload }
        },
    }
})

export const { removeSelectedMovieorShow, searchMovies } = movieSlice.actions
export const getAllMovies = state => state.movies.movies
export const getAllShows = state => state.movies.shows
export const getSelectedMovieorShow = state => state.movies.selectedMovies
export const searchTerm = state => state.movies.searchTerm
export default movieSlice.reducer