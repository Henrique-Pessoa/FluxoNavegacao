'use client';
import RequireAuth from '../components/RequireAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import NewMachine from '../components/NewMachine';

const Maquinas: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [machine, setMachine] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/');
  };

  return (
    <RequireAuth setToken={setToken}>
      <main className='min-h-screen'>
        <nav className='bg-bgColor h-28 flex items-center shadow-2xl shadow-zinc-600'>
          <div className='bg-bgTitle w-20 sm:w-32 ml-3 flex justify-end'>
            <h1 className='text-white text-4xl sm:text-6xl'>ATV</h1>
          </div>
          <h1 className='text-title text-4xl sm:text-6xl ml-2'>WEB</h1>
          <div className='flex ml-auto mr-6 gap-6'>
            <h1
              className='text-2xl sm:text-3xl font-semibold text-title cursor-pointer ml-5'
              onClick={() => setMachine(true)}
            >
              Novo equipamento
            </h1>
            <LogoutIcon
              className='cursor-pointer hover:scale-125 hover:transition-transform'
              style={{ fontSize: 40 }}
              onClick={handleLogout}
            />
          </div>
        </nav>
        <div className='p-6'>
          <Card />
        </div>
        {machine && <NewMachine onClose={() => setMachine(false)} />}
      </main>
    </RequireAuth>
  );
};

export default Maquinas;
