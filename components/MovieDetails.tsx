import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncMovieorShowDetail,
  getSelectedMovieorShow,
  removeSelectedMovieorShow
} from '../redux/store/movies/moviesSlice';
import { Card, CardHeader, Image, Spacer } from '@nextui-org/react';
import {
  CalendarIcon,
  StarIcon,
  HandThumbUpIcon,
  FilmIcon
} from '@heroicons/react/24/solid';
import { AppDispatch } from '../redux/store/store';
import { Loader } from './index';
import { GET_MOVIE_POSTER } from '../common/movieApiKey';

export const MovieDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { imdbID } = useParams();
  const data = useSelector(getSelectedMovieorShow);
  console.log(data);

  useEffect(() => {
    dispatch(fetchAsyncMovieorShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieorShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div className='movie-section bg-[#0F171E] text-white'>
      {Object.keys(data).length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div className='flex justify-center items-center w-full'>
            <img
              className='object-cover w-3/4'
              src={GET_MOVIE_POSTER + data.backdrop_path}
            />
          </div>
          <div className='md:grid md:grid-cols-3 flex flex-col w-full md:h-screen p-10 md:pr-0'>
            <div className='section-left md:col-span-2 flex flex-col md:justify-start justify-center md:items-start items-center'>
              <div className='movie-title text-5xl mb-5 font-bold'>
                {data.original_title || data.title || data.name}
              </div>
              <div className='movie-title text-xl'>{data.tagline}</div>
              <Spacer y={8} />
              <div className='overflow-x-auto'>
                <table className='w-full table-auto'>
                  <tr>
                    <td className='font-bold p-4 pr-0 text-right min-w-[120px]'>
                      IMDB Rating
                    </td>
                    <td className='p-4 flex items-center'>
                      <span className='w-6 h-6 inline-block mr-2 text-[#ff9e00]'>
                        <StarIcon className='icon' />
                      </span>
                      {data.vote_average}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-bold p-4 pr-0 text-right min-w-[120px]'>
                      IMDB Votes
                    </td>
                    <td className='p-4 flex items-center'>
                      <span className='w-6 h-6 inline-block mr-2 text-rose-600'>
                        <HandThumbUpIcon className='icon' />
                      </span>
                      {data.vote_count}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-bold p-4 pr-0 text-right min-w-[120px]'>
                      Runtime
                    </td>
                    <td className='p-4 flex items-center'>
                      <span className='w-6 h-6 inline-block mr-2 text-orange-700'>
                        <FilmIcon className='icon' />
                      </span>
                      {data.runtime}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-bold p-4 pr-0 text-right min-w-[120px]'>
                      Release Date
                    </td>
                    <td className='p-4 flex items-center'>
                      <span className='w-6 h-6 inline-block mr-2 text-pink-600'>
                        <CalendarIcon className='icon' />
                      </span>
                      {data.release_date}
                    </td>
                  </tr>
                </table>
              </div>
              <Spacer y={8} />
              <div className='text-3xl text-bold mb-5'>Synopsis</div>
              <div className='movie-plot leading-7 font-normal'>
                {data.overview}
              </div>
            </div>
            <div className='section-right md:col-span-1 md:mt-0 mt-10 flex justify-center md:justify-start md:ml-10'>
              <Image
                className=''
                src={GET_MOVIE_POSTER + data.poster_path}
                alt={data.title}
              />
            </div>
          </div>
          <div className='p-10 md:pr-0'>
            <div className='text-4xl mb-10'>Production Companies</div>
            <div className='flex justify-around items-center flex-col sm:flex-row'>
              {data.production_companies.map((data: any, i: number) => (
                <Card
                  shadow='sm'
                  key={i}
                  className='w-fit h-fit col-span-1 py-6 bg-transparent text-white'
                >
                  <Image
                    shadow='sm'
                    radius='lg'
                    width='100%'
                    className='object-fill min-w-fill min-h-[4rem] max-h-16 max-w-16'
                    alt={'No Image Available'}
                    src={GET_MOVIE_POSTER + data.logo_path}
                  />
                  <CardHeader>{data.name}</CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
