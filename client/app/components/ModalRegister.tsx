import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
  onClose: () => void;
}

const ModalRegister = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    funcao: '',
  });

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [funcao, setFuncao] = useState('');
  const [erro, setErro] = useState('');
  const [confirmPassword, setCofirPassword] = useState('');
  //const handleInputChange = (e:any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setErro('Password and confirm password must be equal');
    } else if (password == '' || confirmPassword == '') {
      setErro('Password or confirm passowrd cannot be null');
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/register/', {
          username: name,
          password: password,
          funcao: funcao,
        });
        router.push('/rotaProtegida');
      } catch (error) {
        setErro('Unable to register the user maybe password already exist');
      }
    }
  };

  return (
    <main className='w-full h-screen bg-transparent absolute top-0 backdrop-blur-lg justify-center flex'>
      <div className='mt-28 bg-[#DCE2E5] w-[55rem] h-[35rem] flex flex-col  flex-wrap relative rounded-xl shadow-black animate__animated animate__fadeIn  '>
        <CloseIcon
          onClick={onClose}
          className='right-5 top-2 absolute cursor-pointer w-10 h-10 text-[#8a0907] rounded-full border-2 border-title'
          style={{ fontSize: 40 }}
        />
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            defaultValue={formData.name}
            placeholder='Name'
            className='w-72 h-14 m-auto mb-5 mt-10 border-title bg-transparent rounded-2xl border-2 outline-none text-center text-black  font-bold bg-[#68c0c2] focus:shadow-xl transition-shadow duration-300'
          />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={formData.password}
            placeholder='Password'
            className='w-72 h-14 m-auto mb-5 mt-5 border-title bg-transparent rounded-2xl border-2 outline-none text-center text-black  font-bold bg-[#68c0c2] focus:shadow-xl transition-shadow duration-300 '
          />
          <input
            placeholder='ConfirmPassword'
            type='password'
            onChange={(e) => setCofirPassword(e.target.value)}
            className='w-72 h-14 m-auto mb-5 mt-5 border-title bg-transparent rounded-2xl border-2 outline-none text-center text-black  font-bold bg-[#68c0c2] focus:shadow-xl transition-shadow duration-300 '
          />
          <input
            type='text'
            onChange={(e) => setFuncao(e.target.value)}
            defaultValue={formData.funcao}
            placeholder='Role'
            className='w-72 h-14 m-auto mb-5 mt-5 border-title bg-transparent rounded-2xl border-2 outline-none text-center text-black focus:shadow-xl transition-shadow duration-300'
          />
          <button
            type='submit'
            className=' w-52 h-16 m-auto rounded-2xl font-bold mt-5 bg-bgColor border-title border-2 hover:scale-105 transition-transform duration-300 ease-in-out'
          >
            Register
          </button>
        </form>
        <h1 className='text-red-700 relative flex m-auto'>{erro}</h1>
      </div>
    </main>
  );
};

export default ModalRegister;
