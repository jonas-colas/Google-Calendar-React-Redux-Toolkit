import React from "react"

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: null,
  setSmallCalendarMonth: (index) => {},
  selectedDay: null,
  setSelectedDay: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchEvent: (type, payload) => {},
  storedEvents: [],
  selectedEvent: null, 
  setSelectedEvent: () => {},
});

export default GlobalContext;