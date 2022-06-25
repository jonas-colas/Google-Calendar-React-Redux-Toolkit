import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { pickMonth, getMonthNum, today } from './utils';
import CalendarHearder from './components/CalendarHearder';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import { eventUnSelect, upMonth } from './features/slices/calendar-slice';


function App() {
  const dispatch = useDispatch();
  const monthIndex = useSelector(state => state.calendar.monthIndex);
  const smallCalendar = useSelector(state => state.calendar.smallCalendar);
  const openModal = useSelector(state => state.modal.showEventModal);
  
  const [currenMonth, setCurrentMonth] = useState(pickMonth());
  
  useEffect(() => {
    dispatch(upMonth(getMonthNum(today)))
  }, [dispatch]); 

  useEffect(() => {
    if(!openModal) {
      dispatch(eventUnSelect());
    }
  }, [openModal, dispatch]); 

  useEffect(() => {
    if(smallCalendar !== null) {
      dispatch(upMonth(smallCalendar))
    }
  }, [smallCalendar, dispatch]); 

  useEffect(() => {
    setCurrentMonth(pickMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {openModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHearder />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
