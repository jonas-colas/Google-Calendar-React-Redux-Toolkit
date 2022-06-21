import { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { labels } from '../constants/labels';

const EventModal = () => {
  const { 
    setShowEventModal, 
    selectedDay, 
    dispatchEvent, 
    selectedEvent 
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ?  selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labels.find(label => label.id === selectedEvent.label.id) : labels[0]
  );
  const [borderColor, setBorderColor] = useState('border-gray-200');

  const handleEvent = (e) => {
    e.preventDefault();
    if(title.length === 0 || title.length > 30) {
      setBorderColor('border-red-200');
      return;
    }
    const calendarEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      label: selectedLabel,
      day: selectedDay
    };
    if(selectedEvent) {
      dispatchEvent({ type: "EDIT_EVENT", payload: calendarEvent });
    }else{
      dispatchEvent({ type: "ADD_EVENT", payload: calendarEvent});
    }
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span 
                className="material-icons-outlined text-gray-400 cursor-pointer text-red-500 hover:text-gray-800" 
                onClick={() => {
                  dispatchEvent({
                    type: "DELETE_EVENT", 
                    payload: selectedEvent
                  });
                  setShowEventModal(false)
                }}>
                delete
              </span>
            )}
            <button type="button" onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">close</span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <div>
              <input
                type="text"
                placeholder="Add title"
                className={`pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-0 focus:border-blue-500`}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <small className="float-right text-gray-500">(* Max 30 chars)</small>
            </div>
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
          <button type="submit" onClick={handleEvent}
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
