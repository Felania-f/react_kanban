// export default TaskForm;
import React, { useState } from 'react';
import Task from '../models/Task';
import { TaskStatus } from '../models/Task';

function TaskForm({ task, onSubmit, onCancel }) {
  //initialiser avec les valeurs de la tâche ou des valeurs vides
  const [formData, setFormData] = useState({
    titre: task ? task.getTitre() : '',
    auteur: task ? task.getAuteur() : '',
    attribution: task ? task.getAttribution() : '',
    date_debut: task ? task.getDateDebut() : '',
    date_fin: task ? task.getDateFin() : '',
    status: task ? task.getStatus() : 'TODO'
  });

  //gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedTask;

    if (task) {
      updatedTask = new Task(
        formData.titre,
        formData.auteur,
        formData.attribution,
        formData.date_debut,
        formData.date_fin,
        formData.status,
        task.getId()
      );
    } else {
      updatedTask = new Task(
        formData.titre,
        formData.auteur,
        formData.attribution,
        formData.date_debut,
        formData.date_fin,
        formData.status
      );
    }

    onSubmit(updatedTask);
  };

  const inputStyle = {
    padding: '8px 12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="titre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Titre:
        </label>
        <input
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre de la tâche"
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="auteur" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Auteur:
        </label>
        <input
          id="auteur"
          name="auteur"
          value={formData.auteur}
          onChange={handleChange}
          placeholder="Nom de l'auteur"
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="attribution" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Assignée à:
        </label>
        <input
          id="attribution"
          name="attribution"
          value={formData.attribution}
          onChange={handleChange}
          placeholder="Personne assignée"
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="date_debut" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Date de début:
        </label>
        <input
          id="date_debut"
          name="date_debut"
          type="date"
          value={formData.date_debut}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="date_fin" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Date de fin:
        </label>
        <input
          id="date_fin"
          name="date_fin"
          type="date"
          value={formData.date_fin}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Statut:
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          {Object.keys(TaskStatus).map(key => (
            <option key={key} value={key}>
              {TaskStatus[key]}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {task ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;