import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CalendarEvent from './CalendarEvent';
import calendarMessagesES from '../../helpers/calendar-messages-es';
import CalendarModal from './CalendarModal';
import moment from 'moment';
import 'moment/locale/es';

import Navbar from '../ui/Navbar';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');

const localizer = momentLocalizer(moment);
const events = [
  {
    bgColor: '#fafafa',
    end: moment().add(2, 'hours').toDate(),
    notes: 'Buy a cake',
    start: moment().toDate(),
    title: 'Cumpleaños del jefe',
    user: {
      _id: '123',
      name: 'Paco',
    },
  },
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEven = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367FFF',
      borderRadius: '0px',
      color: 'white',
      display: 'block',
      opacity: '0.8',
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        components={{
          event: CalendarEvent,
        }}
        endAccessor="end"
        events={events}
        eventPropGetter={eventStyleGetter}
        localizer={localizer}
        messages={calendarMessagesES}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEven}
        onView={onViewChange}
        startAccessor="start"
        view={lastView}
      />

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
