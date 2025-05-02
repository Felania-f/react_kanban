import React from 'react';
import KanbanColumn from './KanbanColumn';
import { TaskStatus } from '../models/Task.js';

function KanbanBoard({ tasks, onEditTask, onDeleteTask }) {

  const statusKeys = Object.keys(TaskStatus);

  return (
    <div style={{ display: 'flex', gap: '20px', overflow: 'auto' }}>
      {statusKeys.map(statusKey => (
        <KanbanColumn
          key={statusKey}
          status={statusKey}
          title={TaskStatus[statusKey]}
          tasks={tasks.filter(task => task.getStatus() === statusKey)}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;