import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncMovieorShowDetail,
  getSelectedMovieorShow,
  removeSelectedMovieorShow
} from '../redux/store/movies/moviesSlice';
import { Image, Spacer, Spinner } from '@nextui-org/react';
import {
  CalendarIcon,
  StarIcon,
  HandThumbUpIcon,
  FilmIcon
} from '@heroicons/react/24/solid';
import { AppDispatch } from '../redux/store/store';

const Loader = () => {
  return (
    <div className='h-screen m-0 flex justify-center items-center'>
      <div className='w-40 h-40 rounded-large bg-[#858595] flex justify-center items-center'>
        <Spinner
          color='secondary'
          labelColor='secondary'
          classNames={{
            wrapper: 'w-20 h-20'
          }}
          size='lg'
        />
      </div>
    </div>
  );
};

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
    <div className='movie-section bg-[#0F171E] text-white mt-20'>
      {Object.keys(data).length === 0 ? (
        <Loader />
      ) : (
        <div className='md:grid md:grid-cols-3 flex flex-col w-full md:h-screen p-10 md:pr-0'>
          <div className='section-left md:col-span-2 flex flex-col md:justify-start justify-center md:items-start items-center'>
            <div className='movie-title text-5xl'>{data.Title}</div>
            <Spacer y={8} />
            <div className='movie-rating flex sm:flex-row flex-col justify-start sm:items-center items-start'>
              <div className='mr-6 flex text-[#79b8f3]'>
                IMDB Rating <StarIcon className='w-6 h-6 mx-2 text-[#ff9e00]' />{' '}
                : {data.imdbRating}
              </div>
              <div className='mr-6 flex text-[#79b8f3]'>
                IMDB Votes{' '}
                <HandThumbUpIcon className='w-6 h-6 mx-2 text-rose-600' /> :{' '}
                {data.imdbVotes}
              </div>
              <div className='mr-6 flex text-[#79b8f3]'>
                Runtime <FilmIcon className='w-6 h-6 mx-2 text-orange-700' /> :{' '}
                {data.Runtime}
              </div>
              <div className='mr-6 flex text-[#79b8f3]'>
                Year
                <CalendarIcon className='w-6 h-6 mx-2 text-pink-600' /> :{' '}
                {data.Year}
              </div>
            </div>
            <Spacer y={8} />
            <div className='movie-plot leading-7 font-normal'>{data.Plot}</div>
            <Spacer y={8} />
            <table className='movie-info w-3/4'>
              <tr className='pb-4'>
                <td className='text-lg font-semibold'>Director:</td>
                <td className='text-[#79b8f3]'>{data.Director}</td>
              </tr>
              <tr className='pb-4'>
                <td className='text-lg font-semibold'>Stars:</td>
                <td className='text-[#79b8f3]'>{data.Actors}</td>
              </tr>
              <tr className='pb-4'>
                <td className='text-lg font-semibold'>Genres:</td>
                <td className='text-[#79b8f3]'>{data.Genre}</td>
              </tr>
              <tr className='pb-4'>
                <td className='text-lg font-semibold'>Languages:</td>
                <td className='text-[#79b8f3]'>{data.Language}</td>
              </tr>
              <tr>
                <td className='text-lg font-semibold'>Awards:</td>
                <td className='text-[#79b8f3]'>{data.Awards}</td>
              </tr>
            </table>
          </div>
          <div className='section-right md:col-span-1 md:mt-0 mt-10 flex justify-center md:justify-start md:ml-10'>
            <Image className='' src={data.Poster} alt={data.title} />
          </div>
        </div>
      )}
    </div>
  );
};
