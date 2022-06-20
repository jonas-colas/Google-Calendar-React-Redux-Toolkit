import React, { useEffect, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

function eventsReducer(state, { type, payload }) {
  switch (type) {
    case 'ADD_EVENT': 
      return [...state, payload];
    case 'EDIT_EVENT': 
      return state.map(event => event.id === payload.id ? payload : event);
    case 'DELETE_EVENT': 
      return state.filter(event => event.id !== payload.id);
    default:
      throw new Error();
  };
};

function initEvents() {
  const eventStorages = localStorage.getItem('allEvents');
  const parsedEvents = eventStorages ? JSON.parse(eventStorages) : [];
  return parsedEvents;
}


const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [storedEvents, dispatchEvent] = useReducer(eventsReducer, [], initEvents);

  useEffect(() => {
    localStorage.setItem('allEvents', JSON.stringify(storedEvents));
  }, [storedEvents]);
  
  useEffect(() => {
    if(smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        selectedDay, 
        setSelectedDay,
        showEventModal, 
        setShowEventModal,
        dispatchEvent,
        storedEvents,
        selectedEvent, 
        setSelectedEvent,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
