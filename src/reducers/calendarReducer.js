import types from '../types/types';

const initialState = {
  events: [],
  activeEvent: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return { ...state, events: [...state.events, action.payload] };

    case types.eventClearActive:
      return { ...state, activeEvent: null };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload.id),
        activeEvent: null,
      };

    case types.eventSetActive:
      return { ...state, activeEvent: action.payload };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    default:
      return state;
  }
};

export default calendarReducer;
