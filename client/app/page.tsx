'use client';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ModalRegister from './components/ModalRegister';
import { useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import Loader from './components/Loader';

export default function Home() {
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const inputNUm = (e: any) => {
    setPassword(password + e.target.value);
  };
  const clear = () => {
    setPassword('');
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        body: JSON.stringify({ password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        router.push('/maquinas');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      setErro('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-bgColor w-full h-screen'>
      <div className='flex justify-center sticky top-11'>
        <div className='bg-bgTitle w-60 mr-3 relative flex justify-end h-36'>
          <h1 className='text-white text-8xl z-20 absolute bottom-0 transformtext-right'>
            ATV
          </h1>
        </div>
        <h1 className='text-title text-8xl relative top-12'>WEB</h1>
      </div>
      <div className='bg-white w-[38rem] h-[38rem] m-auto mt-16 text-center relative'>
        <IconButton onClick={() => setShow(!show)} className='absolute'>
          {show ? (
            <VisibilityIcon style={{ fontSize: 30 }} />
          ) : (
            <VisibilityOffIcon style={{ fontSize: 30 }} />
          )}
        </IconButton>
        <input
          type={show ? 'text' : 'password'}
          disabled={true}
          value={password}
          className=' text-center relative  border-b-2 border-solid border-0 border-[#949d9c] outline-none w-96 mt-10 bg-transparent '
        />
        <div className='flex flex-wrap mt-3 w-80 m-auto ml-40 gap-5'>
          <button
            value={1}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            1
          </button>
          <button
            value={2}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            2
          </button>
          <button
            value={3}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            3
          </button>
          <button
            value={4}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            4
          </button>
          <button
            value={5}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            5
          </button>
          <button
            value={6}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            6
          </button>
          <button
            value={7}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            7
          </button>
          <button
            value={8}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            8
          </button>
          <button
            value={9}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle  hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            9
          </button>
          <button
            onClick={clear}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            C
          </button>
          <button
            value={0}
            onClick={inputNUm}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle hover:scale-110 transition-transform duration-500 ease-in-out'
          >
            0
          </button>
          <button
            onClick={handleLogin}
            className=' border-bgColor rounded-full w-20 h-20  border-solid text-title border-2 font-sans text-3xl hover:bg-bgTitle hover:scale-110 transition-transform duration-500 ease-in-out '
          >
            <LoginIcon style={{ fontSize: 40 }} />
          </button>
        </div>
        <h1 className='text-red-900 mt-5'>{erro}</h1>
        <button
          onClick={() => setRegister(true)}
          className='bg w-52 h-16 mt-2 text-title border-title rounded-2xl font-bold text-xl bg-bgColor border-2 hover:bg-slate-100 bg-opacity-75 transition duration-500  hover:scale-110'
        >
          Register
        </button>
      </div>
      {register && <ModalRegister onClose={() => setRegister(false)} />}
      {loading ? (
        <div className='absolute w-full h-full justify-center m-auto flex top-0 bg-transparent backdrop-blur-sm'>
          <Loader />
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
