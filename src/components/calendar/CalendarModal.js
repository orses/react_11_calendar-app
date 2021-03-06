import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventClearActive,
  eventUpdated,
} from '../../actions/events';

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

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

const CalendarModal = () => {
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);
  const { isModalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const modalSettings = {
    title: activeEvent ? 'Editar evento' : 'Nuevo evento',
  };

  useEffect(() => {
    if (activeEvent) {
      // activeEvent return form data
      // and other fields of the event like user, id...
      setFormValues(activeEvent);
    } else {
      // if activeEvent is null
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const { end, notes, start, title } = formValues;

  const handleRequestClose = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initEvent);
  };

  const handleStartDateTimeChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      start: e,
    }));
  };

  const handleEndDateTimeChange = (e) => {
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
        'La fecha de finalizaci??n debe ser mayor que la fecha de inicio',
        'error'
      );
    }

    if (title.trim().length < 2) {
      return setIsTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: { _id: '123', name: 'Pepe' },
        })
      );
    }

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
      <h1>{modalSettings.title}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            className="form-control"
            name="start"
            onChange={handleStartDateTimeChange}
            value={start}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de fin</label>
          <DateTimePicker
            className="form-control"
            minDate={start}
            name="end"
            onChange={handleEndDateTimeChange}
            value={end}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>T??tulo y notas</label>
          <small id="emailHelp" className="form-text text-muted">
            Una descripci??n corta
          </small>
          <input
            autoComplete="off"
            className={`form-control ${!isTitleValid && 'is-invalid'}`}
            name="title"
            onChange={handleInputChange}
            placeholder="T??tulo del evento"
            type="text"
            value={title}
          />
        </div>

        <div className="form-group">
          <small id="emailHelp" className="form-text text-muted">
            Informaci??n adicional
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

        <button type="submit" className="btn btn-success btn-block py-3 ">
          <i aria-hidden="true" className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </ReactModal>
  );
};

export default CalendarModal;
