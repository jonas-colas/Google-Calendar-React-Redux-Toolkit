import { useContext } from 'react';
import plus from '../assets/plus.svg';
import GlobalContext from '../context/GlobalContext';

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={() => setShowEventModal(true)}>  
      <img src={plus} alt="Event" className="w-7 h-7"/>
      <span className="pl-3 pr-7">Create</span>
    </button>
  )
}

export default CreateEventButton