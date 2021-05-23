import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(30, 'minutes');
const nowPlus1 = now.clone().add(1, 'hours');

const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
  });
  const { isModalOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const handleInputChange = ({ target }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const { end, notes, start, title } = formValues;

  const handleRequestClose = () => {
    dispatch(uiCloseModal());
  };

  const handleStartDateTimeChange = (e) => {
    setDateStart(e);
    setFormValues((prevState) => ({
      ...prevState,
      start: e,
    }));
  };

  const handleEndDateTimeChange = (e) => {
    setDateEnd(e);
    setFormValues((prevState) => ({
      ...prevState,
      end: e,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha de finalización debe ser mayo que la fecha de inicio',
        'error'
      );
    }

    if (title.trim().length < 2) {
      return setIsTitleValid(false);
    }

    //TODO:grabar datos en db
    setIsTitleValid(true);
    handleRequestClose();
  };

  return (
    <ReactModal
      className="modal"
      closeTimeoutMS={200}
      contentLabel="Example modal"
      isOpen={isModalOpen}
      // onAfterClose={handleAfterClose}
      onRequestClose={handleRequestClose}
      overlayClassName="modal-fondo"
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            className="form-control"
            name="start"
            onChange={handleStartDateTimeChange}
            value={dateStart}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de fin</label>
          <DateTimePicker
            className="form-control"
            minDate={dateStart}
            name="end"
            onChange={handleEndDateTimeChange}
            value={dateEnd}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Título y notas</label>
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
          <input
            autoComplete="off"
            className={`form-control ${!isTitleValid && 'is-invalid'}`}
            name="title"
            onChange={handleInputChange}
            placeholder="Título del evento"
            type="text"
            value={title}
          />
        </div>

        <div className="form-group">
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
          <textarea
            className="form-control"
            name="notes"
            onChange={handleInputChange}
            placeholder="Notas"
            rows="5"
            type="text"
            value={notes}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-outline-success btn-block">
          <i aria-hidden="true" className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </ReactModal>
  );
};

export default CalendarModal;
