import { Button, Input } from '@nextui-org/react';

export const DropDown = ({
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
}): JSX.Element => {
  return (
    <div
      className={
        isOpen
          ? 'grid grid-cols-1 text-center w-full h-fit p-5 items-center fixed top-20 z-10 dark:bg-white dark:text-black bg-blue-800 origin-top transition-all'
          : 'hidden'
      }
      onClick={toggle}
    >
      <div>
        <Input
          placeholder='Search...'
          value={movieSearch}
          onChange={e => setMovieSearch(e.target.value)}
          className='border-2 border-black'
        />
        <Button className='ml-4' color='secondary' onClick={searchQuery}>
          Search
        </Button>
      </div>
      {/* <div className='px-4'>
        <Link href='/'>Home</Link>
      </div>
      <div className='p-4'>
        <Link href='#About'>About</Link>
      </div>
      <div className='p-4'>
        <Link href='#Skills'>Skills</Link>
      </div>
      <div className='p-4'>
        <Link href='#Projects'>Projects</Link>
      </div> */}
      {/* <div className='p-4'>
        <a target='_blank' href={data.social.Resume} rel='noopener noreferrer'>
          <button className='pdf'>Resume</button>
        </a>
      </div> */}
    </div>
  );
};
