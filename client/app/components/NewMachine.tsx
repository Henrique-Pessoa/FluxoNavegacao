'use client';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Props {
  onClose: () => void;
}

interface MachineI {
  name: string;
  image: string;
  description: string;
  activate: boolean;
}

const NewMachine = ({ onClose }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [erro, setErro] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleRegister = async () => {
    console.log(token);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/equipamentos/',
        {
          nome: name,
          image: image,
          descricao: description,
          ativo: isChecked,
        },
        config,
      );
      window.location.reload();
    } catch (error) {
      setErro("Can't register the machine");
    }
  };
  return (
    <main className='w-full h-screen bg-transparent absolute top-0 backdrop-blur-sm  z-20 justify-center flex'>
      <div className='w-[60rem]  h-[30rem] bg-white border-2 border-black m-auto'>
        <div className='w-full flex m-4 relative'>
          <h1 className='text-title text-start text-3xl flex-grow'>
            Cadastro de Equipamento
          </h1>
          <CloseIcon
            onClick={onClose}
            style={{ fontSize: 40 }}
            className='mr-6 relative bottom-3 text-title cursor-pointer'
          />
        </div>
        <div className='flex flex-col gap-8 relative mt-11 ml-5'>
          <input
            type='text'
            name=''
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            className='border-b-2 border-black w-[55rem] outline-none'
          />
          <input
            type='text'
            name=''
            placeholder='Image address'
            onChange={(e) => setImage(e.target.value)}
            className='border-b-2 border-black w-[55rem] outline-none'
          />
          <textarea
            className=' border-b-2 border-black outline-none w-[55rem] box-border resize-none'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label className='flex items-center space-x-2 right-2 relative mt-3'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='hidden'
            />
            <div className='w-6 h-6 right-1 relative border border-black rounded-md flex items-center justify-center bg-black'>
              {isChecked && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='white'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              )}
            </div>
            Ativo
          </label>
        </div>
        <button
          onClick={handleRegister}
          className='w-40 h-14 rounded-2xl bg-title relative ml-2 mt-10 text-1xl font-bold text-white border-2 border-black'
        >
          Register
        </button>
      </div>
    </main>
  );
};

export default NewMachine;
