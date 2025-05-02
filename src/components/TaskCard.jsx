import React from 'react';

function TaskCard({ task, onEdit, onDelete }) {
  //les dates pour affichage
  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      background: 'white',
      margin: '5px 0',
      padding: '15px',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ marginTop: 0 }}>{task.getTitre()}</h3>

      <div style={{ fontSize: '14px', marginBottom: '10px' }}>
        <p style={{ margin: '5px 0' }}><strong>Auteur:</strong> {task.getAuteur()}</p>
        <p style={{ margin: '5px 0' }}><strong>Assigné à:</strong> {task.getAttribution()}</p>
        <p style={{ margin: '5px 0' }}><strong>Début:</strong> {formatDate(task.getDateDebut())}</p>
        <p style={{ margin: '5px 0' }}><strong>Fin:</strong> {formatDate(task.getDateFin())}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={onEdit}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Modifier
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '5px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default TaskCard;