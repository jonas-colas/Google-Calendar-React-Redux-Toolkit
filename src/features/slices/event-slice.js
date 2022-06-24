import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const {id, title, description, label, day} = action.payload;
      const event = state.events.find(ev => ev.id === id);
      if(event) {
        event.title = title;
        event.description = description;
        event.label = label;
        event.day = day;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload.id);
    }
  },
});

export const {addEvent, updateEvent, deleteEvent} = eventSlice.actions;

export const getAllEvents = (state) => state.events.events;

export default eventSlice.reducer;