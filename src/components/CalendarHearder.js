import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { monthYear, getMonthNum, getYear, today } from '../utils';
import { upMonth } from '../features/slices/calendar-slice';

const CalendarHearder = () => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(state => state.calendar.monthIndex);
  
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="logo" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button
        className="border rounded py-2 px-4 mr-5"
        onClick={() => dispatch(upMonth(getMonthNum(today)))}
      >
        Today
      </button>
      <button onClick={() => dispatch(upMonth(monthIndex - 1))}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={() => dispatch(upMonth(monthIndex + 1)) }>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {monthYear(getYear(today), monthIndex)}
      </h2>
    </header>
  );
};

export default CalendarHearder;
