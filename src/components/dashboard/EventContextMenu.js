import React, { useEffect, useRef } from 'react';
import './modern-dashboard.css';

const EventContextMenu = ({ 
  event, 
  position, 
  onEdit, 
  onDelete, 
  onClose, 
  isVisible 
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible || !event) return null;

  return (
    <div 
      ref={menuRef}
      className="event-context-menu"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: 1000
      }}
    >
      <div className="context-menu-header">
        <h4 className="context-menu-title">{event.title}</h4>
        <span className={`context-menu-type ${event.type}`}>
          {event.type === 'session' ? 'Session' : 'Meeting'}
        </span>
      </div>
      
      <div className="context-menu-details">
        {event.section && <p><strong>Section:</strong> {event.section}</p>}
        {event.location && <p><strong>Location:</strong> {event.location}</p>}
        <p><strong>Time:</strong> {event.startTime || 'TBD'}{event.endTime ? ` - ${event.endTime}` : ''}</p>
      </div>

      <div className="context-menu-actions">
        <button 
          className="btn btn-secondary context-menu-btn"
          onClick={() => {
            onEdit(event);
            onClose();
          }}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn btn-danger context-menu-btn"
          onClick={() => {
            onDelete(event);
            onClose();
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default EventContextMenu;