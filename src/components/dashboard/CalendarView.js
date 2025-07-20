import React, { useMemo } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';
import './modern-dashboard.css';

const CalendarView = ({ 
  currentDate, 
  setCurrentDate, 
  upcomingSessions, 
  upcomingMeetings, 
  onEventClick,
  canManageSessions,
  canManageMeetings 
}) => {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    // Ensure weeks start on Sunday (weekStartsOn: 0)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  const allEvents = useMemo(() => [
    ...upcomingSessions,
    ...upcomingMeetings
  ], [upcomingSessions, upcomingMeetings]);

  const getEventsForDate = (date) => {
    return allEvents.filter(event => {
      const eventDate = event.date.toDate ? event.date.toDate() : new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  return (
    <div className="calendar-wrapper fade-in">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button 
            onClick={() => navigateMonth('prev')} 
            className="calendar-nav-btn"
            aria-label="Previous month"
          >
            ←
          </button>
          <button 
            onClick={() => navigateMonth('next')} 
            className="calendar-nav-btn"
            aria-label="Next month"
          >
            →
          </button>
        </div>
        <h3 className="calendar-title">{format(currentDate, 'MMMM yyyy')}</h3>
        <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
      </div>

      <div className="calendar-container">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {calendarDays.map(day => {
            const eventsForDay = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className={`calendar-date ${
                  !isCurrentMonth ? 'other-month' : ''
                } ${
                  isToday ? 'today' : ''
                } ${
                  eventsForDay.length === 0 ? 'empty-day' : 'has-events'
                }`}
              >
                <div className="date-number">{format(day, 'd')}</div>
                {eventsForDay.length > 0 && (
                  <div className="date-events">
                    {eventsForDay.slice(0, 3).map((event, index) => {
                      const canEdit = event.type === 'session' ? canManageSessions : canManageMeetings;
                      const tooltipText = `${event.title} - ${event.startTime}${event.endTime ? ` to ${event.endTime}` : ''}${canEdit ? ' - Click to edit/delete' : ' - Click for details'}`;
                      
                      return (
                        <div
                          key={index}
                          className={`event-item ${event.type === 'session' ? 'event-session' : 'event-meeting'} event-interactive`}
                          title={tooltipText}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick && onEventClick(event, e);
                          }}
                        >
                          <span className="event-dot"></span>
                          <div className="event-content">
                            <div className="event-title">
                              {event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title}
                            </div>
                            <div className="event-time">
                              {event.startTime}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {eventsForDay.length > 3 && (
                      <div className="event-item text-muted">
                        +{eventsForDay.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;