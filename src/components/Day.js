import dayjs from 'dayjs';
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

const Day = ({ day, rowIndex }) => {
  const [daysWithEvents, setDaysWithEvents] = useState();

  const {
    setSelectedDay, 
    setShowEventModal, 
    storedEvents, 
    setSelectedEvent
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = storedEvents.filter(
      evt => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDaysWithEvents(events);
  }, [storedEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  };
  
  return (
    <div className="border-x border-gray-200 flex flex-col h-24 min-h-full overflow-scroll">
      <header className="border-y">
        {rowIndex === 0 && (
          <div className="flex flex-col items-center">
            <p className="text-sm mt-1 mb-2 font-bold"> {day.format('ddd').toUpperCase()}</p>
          </div>
        )}
      </header>
      <div className="float-left">
        <p className={`text-sm p-1 my-1 ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </div>
      <div 
        className="flex-1 cursor-pointer" 
        onClick={() => { 
          setSelectedDay(day); 
          setShowEventModal(true) 
        }}
      >
        {daysWithEvents?.map((ev, i) => (
          <div 
            key={i}
            onClick={() => setSelectedEvent(ev)}
            className={`${ev.label.bg} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {ev.title}
          </div>
        ))}  
      </div>
    </div>
  );
};

export default Day;
