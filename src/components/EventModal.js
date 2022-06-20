import { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { labels } from '../constants/labels';

const EventModal = () => {
  const { setShowEventModal, selectedDay, dispatchEvent } = useContext(GlobalContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);

  const handleEvent = (e) => {
    e.preventDefault();
    const calendarEvent = {
      id: Date.now(),
      title,
      description,
      label: selectedLabel.valueOf(),
      day: selectedDay
    };
    dispatchEvent({ type: "ADD_EVENT", payload: calendarEvent});
    setShowEventModal(false);
  }
  
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              placeholder="Add title"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-0 focus:border-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">schedule</span>
            <p>
              {selectedDay.format('dddd, MMMM DD')}
            </p>
            <span className="material-icons-outlined text-gray-400">segment</span>
            <input
              type="text"
              placeholder="Add description"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-0 focus:border-blue-500"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">bookmark_border</span>
            <div className="flex gap-x-2">
               {labels.map((label, i) => (
                 <span 
                 key={i} 
                 onClick={() => setSelectedLabel(label)}
                  className={`${label.circle} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                > 
                  {selectedLabel === label && 
                    <span className="material-icons-outlined text-white text-sm">check</span>
                  }
                </span> 
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button onClick={handleEvent}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >        
            save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
