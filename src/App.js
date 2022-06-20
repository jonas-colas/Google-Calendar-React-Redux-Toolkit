import { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './util';
import CalendarHearder from './components/CalendarHearder';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import GlobalContext from './context/GlobalContext';


function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}
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
