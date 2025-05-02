import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import Task from './models/Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map(taskData => Task.fromJSON(taskData));
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks.map(task => task.toJSON())));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowAddForm(false);
  };

  const handleEditTask = (taskToEdit) => {
    // Stocker la tâche à éditer
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.getId() === updatedTask.getId() ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.getId() !== taskToDelete.getId()));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>TO DO LIST</h1>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        {showAddForm ? 'Annuler' : 'Ajouter une tâche'}
      </button>

      {showAddForm && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', width: '20%' }}>
          <h2>Nouvelle tâche</h2>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2>Modifier la tâche</h2>
            <TaskForm
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {/* Tableau Kanban */}
      <KanbanBoard
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;