import { Spinner } from '@nextui-org/react';

export const Loader = () => {
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
