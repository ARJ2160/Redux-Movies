import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '.';
import { StarIcon } from '@heroicons/react/24/solid';

export const MovieCarousel = () => {
  const [popularMovies, setPopularMovies] = useState<any>([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US'
    )
      .then(res => res.json())
      .then(data => setPopularMovies(data.results));
  }, []);

  return (
    <div>
      {popularMovies.length !== 0 ? (
        <Carousel
          showThumbs={false}
          autoPlay={false}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie: any, index: number) => (
            <div key={index}>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/movie/${movie.id}`}
              >
                <div className='h-fit'>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className='m-auto block w-full'
                  />
                </div>
                <div className='absolute p-[5rem] sm:bottom-0 left-[-32px] bottom-8 h-[70%] flex flex-col content-end items-start opacity-100 transition-opacity w-full hover:opacity-100'>
                  <div className='font-black lg:text-6xl md:text-4xl text-2xl mb-2 text-left'>
                    {movie.original_title}
                  </div>
                  <div className='md:text-2xl sm:text-xl text-base mb-5 flex justify-center items-center'>
                    <div>{movie.release_date}</div>
                    <div className='posterImage__rating ml-12 flex justify-center items-center'>
                      <StarIcon className='icon sm:w-10 sm:h-10 w-5 h-5 sm:mr-5 mr-1 text-[#ff9e00]' />
                      {movie.vote_average}
                    </div>
                  </div>
                  <div className='hidden posterImage__description lg:text-2xl text-base mb-1 sm:flex text-left w-1/2'>
                    {movie.overview}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};
