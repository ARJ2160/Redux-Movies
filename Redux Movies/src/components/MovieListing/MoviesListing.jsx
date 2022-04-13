import React from 'react'
import "./MoviesListing.scss"
import { useSelector } from 'react-redux'
import { getAllMovies, getAllShows } from '../../redux/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'

const MoviesListing = () => {

    const movies = useSelector(getAllMovies)
    const shows = useSelector(getAllShows)

    let renderMovies = movies.Response === "True" ?
        (
            movies.Search.map((movie, index) =>
                        <MovieCard key={index} data={movie} />
            )
        ) :
        (
            <div className = "movies-error">
                <h3 style={{ color: "white" }}>{movies.Error}</h3>
            </div>
        )
    let renderShows = shows.Response === "True" ?
        (
            shows.Search.map((show, index) =>
                <MovieCard key={index} data={show} />
            )
        ) :
        (
            <div className = "movies-error">
                <h3 style={{ color: "white" }}>{shows.Error}</h3>
            </div>
        )

    return (
        <div className="movie-wrapper">
            <div className="movie-list">
                <h2>Movies</h2>
                <div className="movie-container">
                    {renderMovies}
                </div>
            </div>
            <div className="show-list">
                <h2>Movies</h2>
                <div className="movie-container">
                    {renderShows}
                </div>
            </div>
        </div>
    )
}

export default MoviesListing
