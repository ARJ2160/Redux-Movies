import React, { useEffect } from 'react'
import MoviesListing from '../MovieListing/MoviesListing'
import { fetchAsyncMovies, fetchAsyncSeries } from '../../redux/movies/movieSlice'
import { useDispatch } from 'react-redux'

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAsyncMovies())
        dispatch(fetchAsyncSeries())
    },[dispatch])

    return (
        <div className="container banner-img">
            <MoviesListing />
        </div>
    )
}

export default Home
