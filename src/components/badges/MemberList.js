import React, { useState, useEffect } from 'react';
import { getMembersBySection, addNewMember, updateMember } from '../../services/memberService';
import MemberProfile from './MemberProfile';
import './MemberList.css';

export default function MemberList({ onSelectMember, selectedMember }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const result = await getMembersBySection(filter === 'all' ? null : filter);
        setMembers(result);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [filter]);

  const filteredMembers = members.filter(member => {
    if (!searchQuery) return true;
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="member-list-container">
      <div className="member-list-sidebar">
        <div className="member-list-controls">
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <div className="section-filter">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'beavers' ? 'active' : ''} 
              onClick={() => setFilter('beavers')}
            >
              Beavers
            </button>
            <button 
              className={filter === 'cubs' ? 'active' : ''} 
              onClick={() => setFilter('cubs')}
            >
              Cubs
            </button>
            <button 
              className={filter === 'scouts' ? 'active' : ''} 
              onClick={() => setFilter('scouts')}
            >
              Scouts
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="members-grid">
            {filteredMembers.length > 0 ? 
              filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className={`member-card ${selectedMember?.id === member.id ? 'selected' : ''}`}
                  onClick={() => onSelectMember(member)}
                >
                  <div className="section-indicator" data-section={member.section}></div>
                  <h3>{member.firstName} {member.lastName}</h3>
                  <p className="member-section">{member.section}</p>
                </div>
              )) : 
              <p>No members found</p>
            }
          </div>
        )}

        <button className="add-member-btn" onClick={() => setShowAddForm(true)}>
          + Add Member
        </button>
      </div>

      <div className="member-detail-panel">
        {selectedMember ? (
          <MemberProfile member={selectedMember} onUpdate={() => setFilter(filter)} />
        ) : (
          <div className="no-selection">
            <p>Select a member to view their badge progress</p>
          </div>
        )}
      </div>
    </div>
  );
}
