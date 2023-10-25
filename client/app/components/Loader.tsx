import Image from 'next/image';
import loader from '../../public/loading.gif';

const Loader = () => (
  <div className='flex justify-center m-auto'>
    <Image
      src={loader}
      alt='Loading'
      className='absolute m-auto rounded-2xl '
    />
  </div>
);

export default Loader;
