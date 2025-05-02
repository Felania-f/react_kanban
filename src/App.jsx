// // import React from 'react';
// // import KanbanBoard from './components/KanbanBoard.jsx';
// // import TaskForm from './components/TaskForm.jsx';
// // // import { TaskStatus } from './Task';

// // const App = () => {
// //   const [tasks, setTasks] = React.useState([]);

// //   const addTask = (task) => {
// //     setTasks([...tasks, task]);
// //   };

// //   const updateTaskStatus = (taskId, newStatus) => {
// //     const updatedTasks = tasks.map(task =>
// //       task.id === taskId ? { ...task, status: newStatus } : task
// //     );
// //     setTasks(updatedTasks);
// //   };

// //   const deleteTask = (taskId) => {
// //     const filteredTasks = tasks.filter(task => task.id !== taskId);
// //     setTasks(filteredTasks);
// //   };

// //   return (
// //     <div>
// //       <h1>Tableau Kanban</h1>
// //       <TaskForm addTask={addTask} />
// //       <KanbanBoard tasks={tasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
// //     </div>
// //   );
// // };

// // export default App;


// import React, { useState } from 'react';
// import KanbanBoard from './components/KanbanBoard';
// import TaskForm from './components/TaskForm';
// import Task from './models/Task';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAddTask = (newTask) => {
//     setTasks([...tasks, newTask]);
//     setIsAdding(false);
//   };

//   const handleEditTask = (updatedTask) => {
//     setTasks(tasks.map(task =>
//       task.getTitre() === updatedTask.getTitre() ? updatedTask : task
//     ));
//   };

//   const handleDeleteTask = (taskToDelete) => {
//     setTasks(tasks.filter(task => task.getTitre() !== taskToDelete.getTitre()));
//   };

//   return (
//     <div>
//       <h1>Kanban Board</h1>
//       <button onClick={() => setIsAdding(true)}>Ajouter une tâche</button>
//       {isAdding && <TaskForm onSubmit={handleAddTask} />}
//       <KanbanBoard
//         tasks={tasks}
//         onEditTask={handleEditTask}
//         onDeleteTask={handleDeleteTask}
//       />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import Task from './models/Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Charger les tâches depuis le localStorage au démarrage
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

  // Sauvegarder les tâches dans le localStorage à chaque modification
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
    // Utiliser l'ID pour identifier et mettre à jour la tâche
    const updatedTasks = tasks.map(task =>
      task.getId() === updatedTask.getId() ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); // Fermer le formulaire d'édition
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.getId() !== taskToDelete.getId()));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tableau Kanban</h1>

      {/* Formulaire d'ajout */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        {showAddForm ? 'Annuler' : 'Ajouter une tâche'}
      </button>

      {showAddForm && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Nouvelle tâche</h2>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Formulaire d'édition modal */}
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
            maxWidth: '500px',
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