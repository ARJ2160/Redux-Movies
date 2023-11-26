import { Link } from 'react-router-dom';
import { Card, CardBody, Image } from '@nextui-org/react';
import { MovieCardType } from '../types/types';
import { GET_MOVIE_POSTER } from '../common/apis/movieApiKey';

export const MovieCard = ({ data }: { data: MovieCardType }) => {
  // const [isHover, setIsHover] = useState<boolean>(false);
  const { id, title, poster_path } = data;
  return (
    <Card shadow='sm' isPressable>
      <CardBody
        className='p-0 min-w-unit-1 min-h-fit overflow-hidden relative'
        // onMouseOver={() => setIsHover(true)}
        // onMouseOut={() => setIsHover(false)}
      >
        <Link to={`/movie/${id}`}>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={'Poster of ' + title + ' movie'}
            className={'hover:scale-110 overflow-hidden object-fit'}
            src={GET_MOVIE_POSTER + poster_path}
          />
        </Link>
        {/* {isHover && (
          <div className='absolute z-10 flex flex-col bottom-0 bg-transparent text-white p-4'>
            <div className='text-xl font-bold'>{title}</div>
            <p className=''>{release_date}</p>
            <p className='text-base'>{overview.slice(0, 50) + '...'}</p>
          </div>
        )} */}
      </CardBody>
    </Card>
  );
};
