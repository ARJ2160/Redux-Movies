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
          autoPlay={true}
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
                <div className='h-[600px]'>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className='m-auto block w-full'
                  />
                </div>
                <div className='absolute p-[5rem] bottom-0 h-[70%] flex flex-col content-end items-start opacity-100 transition-opacity w-full hover:opacity-100'>
                  <div className='font-black text-6xl mb-2 text-left'>
                    {movie.original_title}
                  </div>
                  <div className='text-2xl mb-5 flex justify-center items-center'>
                    <div>{movie.release_date}</div>
                    <div className='posterImage__rating ml-12 flex justify-center items-center'>
                      <StarIcon className='icon w-10 h-10 mr-5 text-[#ff9e00]' />
                      {movie.vote_average}
                    </div>
                  </div>
                  <div className='posterImage__description text-2xl mb-1 flex text-left w-1/2'>
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
