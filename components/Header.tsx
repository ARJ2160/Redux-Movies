import { Input, Button } from '@nextui-org/react';
import { BurgerMenu, DropDown } from './index';
import { Link } from 'react-router-dom';

export const Header = ({
  isOpen,
  toggle,
  movieSearch,
  setMovieSearch,
  searchQuery
}: {
  isOpen: boolean;
  toggle: () => void;
  movieSearch: string;
  setMovieSearch: (search: string) => void;
  searchQuery: () => void;
}) => {
  return (
    <>
      <nav className='bg-black h-20 w-full text-white flex justify-between items-center'>
        <div className='nav-logo flex justify-center items-center ml-10'>
          <Link to='/' className='nav--logo-primary'>
            <img
              className='w-28 h-18 mr-5'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png'
            ></img>
          </Link>
        </div>
        <div className='hidden md:flex justify-center items-center'>
          <Input
            placeholder='Search...'
            value={movieSearch}
            onChange={e => setMovieSearch(e.target.value)}
            className='w-[45vh]'
          />
          <Button className='ml-4' color='secondary' onClick={searchQuery}>
            Search
          </Button>
        </div>
        <div className='flex items-center md:hidden'>
          {/* {status === 'authenticated' && session && session.user && ( */}
          {/* <Image
              className='rounded-full'
              src={session.user.image as string}
              width={'50'}
              height={'50'}
              alt='user image'
            /> */}
          {/* )} */}
          <div className='px-4 cursor-pointer' onClick={toggle}>
            <BurgerMenu />
          </div>
        </div>
        <div className='pr-8 hidden md:flex items-center'>
          {/* {status !== 'authenticated' && (
          <Link to='/login' className='mx-5 cursor-pointer'>
            Sign In
          </Link>
          )}
          {status === 'authenticated' && (
          <div className='flex items-center'>
            <Button
              color='secondary'
              onClick={() => {
                fetch('/');
              }}
              className='mx-5 cursor-pointer'
            >
              Sign Out
            </Button>
            {session && session.user && (
              <Image
               className='rounded-full'
               src={session.user.image as string}
               width={'50'}
               height={'50'}
               alt='user image'
             />
             )}
          </div>
         )} */}
        </div>
        <DropDown
          isOpen={isOpen}
          movieSearch={movieSearch}
          setMovieSearch={setMovieSearch}
          searchQuery={searchQuery}
        />
      </nav>
    </>
  );
};
