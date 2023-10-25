import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteMachine from './DeleteMachine';

interface Equipment {
  id: number;
  image: string;
  nome: string;
  descricao: string;
}

const Card: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [handleDelete, setHandleDelete] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(
    null,
  );
  const handleDeleteEquipment = (id: number) => {
    setEquipments((prevEquipments) =>
      prevEquipments.filter((equipment) => equipment.id !== id),
    );
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    axios
      .get('http://127.0.0.1:8000/equipamentos/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <main>
      {equipments.map((equipment) => (
        <div
          key={equipment.id}
          className='ml-3 max-w-screen-lg mx-auto my-16 relative flex flex-wrap border-b-2 border-title border-dashed h-80'
        >
          <img
            src={equipment.image}
            alt=''
            className='w-80 h-72 object-cover border-2 border-title'
          />
          <div className='flex-1 p-6'>
            <h1 className='font-semibold text-4xl mb-4'>
              {equipment.nome.charAt(0).toUpperCase() + equipment.nome.slice(1)}
            </h1>
            <p className='text-lg mb-4'>{equipment.descricao}</p>
            <div className='flex items-center'>
              <CommentIcon style={{ fontSize: 50 }} className='mr-4' />
              <DeleteIcon
                className='cursor-pointer'
                onClick={() => {
                  console.log(equipment.id);
                  setSelectedMachineId(equipment.id);
                  setHandleDelete(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: 50 }}
              />
            </div>
          </div>
        </div>
      ))}
      {handleDelete && selectedMachineId && (
        <DeleteMachine
          onClose={() => {
            setHandleDelete(false);
            setSelectedMachineId(null);
          }}
          machineId={selectedMachineId}
          onDelete={handleDeleteEquipment}
        />
      )}
    </main>
  );
};

export default Card;
