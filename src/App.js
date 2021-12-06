import React from 'react'
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PageNotFound from './components/PageNotFound/PageNotFound';
import MovieDetails from "./components/MovieDetails/MovieDetails"
import Home from "./components/Home/Home"
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';

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
