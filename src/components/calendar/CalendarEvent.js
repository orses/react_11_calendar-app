import React from 'react';

const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <span>{title}</span> - <em>{user.name}</em>
    </div>
  );
};

export default CalendarEvent;
