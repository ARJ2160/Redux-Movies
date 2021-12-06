import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import { fetchAsyncNavSearchData } from "../../redux/movies/movieSlice"
import "./Header.scss"

const Header = () => {

    const [movieSearch, setMovieInput] = useState('')
    const dispatch = useDispatch()

    const sendData = () => {
        dispatch(fetchAsyncNavSearchData(movieSearch))
        setMovieInput("")
    }
    return (
        <div className="header">
            <Link to="/">
                <div className="logo">Movie App</div>
            </Link>
            <input
                className="header-input"
                type="text"
                name=""
                placeholder="Search..."
                value={movieSearch}
                onChange={e => setMovieInput(e.target.value)}
            />
            <button
                className="search-btn"
                onClick={sendData}>
                Search
            </button>
            <div className="user-image">
                <img src={user} alt="user" />
            </div>
        </div>
    );
};

export default Header;