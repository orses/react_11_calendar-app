import types from '../types/types';

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

const eventDeleted = (id) => ({
  type: types.eventDeleted,
  payload: { id },
});

const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

const eventClearActive = () => ({
  type: types.eventClearActive,
});

export {
  eventAddNew,
  eventClearActive,
  eventDeleted,
  eventSetActive,
  eventUpdated,
};
