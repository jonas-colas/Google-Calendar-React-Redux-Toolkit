import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/event-slice';
import modalReducer from './slices/modal-slice';
import calendarReducer from './slices/calendar-slice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
    modal: modalReducer,
    calendar: calendarReducer,
  },
});
