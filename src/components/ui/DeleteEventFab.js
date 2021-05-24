import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventDeleted } from '../../actions/events';

const DeleteEventFab = () => {
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleDeleteEvent = (e) => {
    dispatch(eventDeleted(activeEvent.id));
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
      <i className="fas fa-trash"></i> <span>Borrar evento</span>
    </button>
  );
};

export default DeleteEventFab;
