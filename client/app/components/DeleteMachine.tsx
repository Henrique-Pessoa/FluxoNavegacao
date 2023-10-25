import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

interface Props {
  onClose: () => void;
  machineId: number;
  onDelete: (id: number) => void;
}

const DeleteMachine: React.FC<Props> = ({
  onClose,
  machineId,
  onDelete,
}: Props) => {
  const handleDeleteCard = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      await axios.delete(`http://127.0.0.1:8000/equipamentos/${machineId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      onDelete(machineId);
      onClose();
    } catch (error) {
      console.error('Error ao deletar equipamento:', error);
    }
  };
  return (
    <main className='w-full h-full bg-transparent absolute top-0 backdrop-blur-sm  z-50 justify-center flex left-0 '>
      <div className='w-[42rem] h-[20rem] bg-white border-2 border-black flex m-auto relative justify-between flex-wrap'>
        <h1 className='ml-3 mt-2 text-3xl text-title  font-bold'>
          Delete Machine
        </h1>
        <CloseIcon
          onClick={onClose}
          style={{ fontSize: 40 }}
          className='mr-3 mt-2 relative bottom-1 text-title cursor-pointer'
        />
        <h4 className='font-bold ml-3 mr-3 text-xl m-auto text-center'>
          ATTENTION! ARE YOU SURE YOU WANT TO DELETE THE MACHINE? THIS ACTION
          CANNOT BE UNDONE ANYMORE!!
        </h4>
        <button
          onClick={handleDeleteCard}
          className='w-48 h-12 bg-red-500 rounded-xl text-white font-bold ml-3 relative top-10 border-2 border-black'
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default DeleteMachine;
