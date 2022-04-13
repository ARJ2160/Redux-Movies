import './App.scss';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import MovieDetails from "./components/MovieDetails/MovieDetails"
import PageNotFound from './components/PageNotFound/PageNotFound';
import React from 'react'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie/:imdbID" element={<MovieDetails />} />
          <Route element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
