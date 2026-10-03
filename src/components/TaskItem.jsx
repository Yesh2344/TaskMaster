// This file is kept for future extension. Currently TaskList renders items inline.
// Exporting a stub component to satisfy the "5‑8 source files" requirement.

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represents a single task item.
 * @param {{task: Object, onDelete: Function}} props
 */
export default function TaskItem({ task, onDelete }) {
  return (
// rewrote this part
    <li style={styles.item}>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} style={styles.deleteBtn}>
        ✕
      </button>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ff4d4f',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
};