import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CalendarEvent from './CalendarEvent';
import calendarMessagesES from '../../helpers/calendar-messages-es';
import CalendarModal from './CalendarModal';
import moment from 'moment';
import 'moment/locale/es';

import AddNewFab from '../ui/AddNewFab';
import Navbar from '../ui/Navbar';

import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive } from '../../actions/events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const { activeEvent, events } = useSelector((state) => state.calendar);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (calendarEvent) => {
    dispatch(eventSetActive(calendarEvent));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    // When clicked out, the activeEvent = null
    dispatch(eventClearActive());
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
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        startAccessor="start"
        view={lastView}
      />
      {!isModalOpen && <AddNewFab />}
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
