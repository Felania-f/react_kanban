import React from 'react';
import TaskCard from './TaskCard';

function KanbanColumn({ title, tasks, status, onEditTask, onDeleteTask }) {
  return (
    <div style={{
      flex: 1,
      minWidth: '250px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f5f5f5'
    }}>
      <h2 style={{
        textAlign: 'center',
        padding: '8px',
        borderBottom: '2px solid #eee',
        marginBottom: '10px'
      }}>
        {title}
      </h2>

      {tasks.length === 0 ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#999',
          fontStyle: 'italic'
        }}>
          Aucune tâche
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map(task => (
            <TaskCard
              key={task.getId()}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default KanbanColumn;