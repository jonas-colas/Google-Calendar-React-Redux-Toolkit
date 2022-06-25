import { useState, useEffect } from 'react';
import { getMonth, dateMonthYear, getDate, today, getWeekday, timeToNum } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../features/slices/modal-slice';
import { getAllEvents } from '../features/slices/event-slice';
import { eventSel, daySel } from '../features/slices/calendar-slice';

const Day = ({ day, rowIndex, monthSel }) => { 
  const dispatch = useDispatch();
  const getEvents = useSelector(getAllEvents);
  
  const [daysWithEvents, setDaysWithEvents] = useState();
  
  useEffect(() => {
    const events = getEvents.filter(
      evt => dateMonthYear(evt.day) === dateMonthYear(day)
    );
    const orderedEvent = events.sort((a, b) => 
      (timeToNum(a.hourStart) - timeToNum(b.hourStart))
    );
    setDaysWithEvents(orderedEvent);
  }, [getEvents, day]);

  const getCurrentDayClass = () => {
    return dateMonthYear(day) === dateMonthYear(today)
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  };
  
  return (
    <div className="border-x border-gray-200 flex flex-col h-24 min-h-full overflow-scroll">
      <header className="border-y">
        {rowIndex === 0 && (
          <div className="flex flex-col items-center">
            <p className="text-sm mt-1 mb-2 font-bold"> {getWeekday(day)}</p>
          </div>
        )}
      </header>
      <div className="float-left">
        { getMonth(day) === monthSel &&
          <p className={`text-sm p-1 my-1 ${getCurrentDayClass()}`}>
            {getDate(day)}
          </p>
        } 
      </div>
      <div 
        className="flex-1 cursor-pointer" 
        onClick={() => { 
          dispatch(daySel(day));
          dispatch(showModal())
        }}
      >
        {daysWithEvents?.map((ev, i) => (
          <div 
            key={i}
            onClick={() => dispatch(eventSel(ev))}
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
