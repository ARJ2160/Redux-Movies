import "./Header.scss"

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { fetchAsyncNavSearchData } from "../../redux/movies/movieSlice"
import { useDispatch } from "react-redux";
import user from "../../images/user.png";

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
        <div className="logo">Sasta IMDb</div>
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