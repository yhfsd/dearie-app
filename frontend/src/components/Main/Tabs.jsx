// src/components/Tabs.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

export default function Tabs({ tabs, activeKey, onChange }) {
  return (
    <nav className="main-tabs">
      <ul>
        {tabs.map(({ key, label }) => (
          <li
            key={key}
            className={key === activeKey ? 'active' : ''}
            onClick={() => onChange(key)}
          >
            <p className="tab-text">{label}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key:   PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange:  PropTypes.func.isRequired,
};
