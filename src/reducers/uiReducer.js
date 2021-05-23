import types from '../types/types';

const initialState = {
  isModalOpen: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        isModalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
