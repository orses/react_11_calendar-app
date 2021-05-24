import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-success fab" onClick={handleClick}>
      <i aria-hidden="true" className="fas fa-plus"></i>
    </button>
  );
};

export default AddNewFab;
