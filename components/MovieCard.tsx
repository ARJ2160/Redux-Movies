import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image
} from '@nextui-org/react';

export const MovieCard = ({ data }: any) => {
  const { Title, Year, Poster, imdbID } = data;
  return (
    <Card shadow='sm' isPressable>
      <CardBody className='p-0 min-w-unit-1 min-h-fit'>
        <Link to={`/movie/${imdbID}`}>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={'Poster of ' + Title + ' movie'}
            className='w-full object-fill min-h-fit overflow-hidden'
            src={Poster}
          />
        </Link>
      </CardBody>
      <CardFooter className='text-small justify-between flex-col'>
        <CardHeader className='text-xl'>{Title}</CardHeader>
        <p className='text-default-500'>{Year}</p>
      </CardFooter>
    </Card>
  );
};
