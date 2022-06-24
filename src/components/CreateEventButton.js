import { useDispatch } from 'react-redux';
import plus from '../assets/plus.svg';
import { showModal } from '../features/slices/modal-slice';

const CreateEventButton = () => {
  const dispatch = useDispatch();

  return (
    <button className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={() => dispatch(showModal())}
    >  
      <img src={plus} alt="Event" className="w-7 h-7"/>
      <span className="pl-3 pr-7">Create</span>
    </button>
  )
}

export default CreateEventButton;