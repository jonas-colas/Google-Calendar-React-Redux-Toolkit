import { createSlice } from '@reduxjs/toolkit';
import { today } from '../../utils';

const initialState = {
  monthIndex: 0,
  smallCalendar: null,
  selectedDay: today.toUTCString(),
  selectedEvent: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    upMonth: (state, action) => {
      state.monthIndex = action.payload
    },
    smallCal: (state, action) => {
      state.smallCalendar = action.payload
    },
    daySel: (state, action) => {
      if(state.selectedDay !== action.payload){
        state.selectedDay = String(action.payload);
      }
    },
    eventSel: (state, action) => {
      if(state.selectedEvent === null) {
        state.selectedEvent = action.payload;
      }
    },
    eventUnSelect: (state, action) => {
      state.selectedEvent = initialState.selectedEvent;
    },
  }
});

export const { upMonth, smallCal, daySel, eventSel, eventUnSelect } = calendarSlice.actions;

export default calendarSlice.reducer;