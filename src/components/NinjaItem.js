import React, { useState } from 'react';
import axios from 'axios';

const NinjaItem = ({ ninja, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: ninja.nome,
    email: ninja.email,
    rank: ninja.rank
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/ninjas/atualizar/${ninja.id}`, formData)
      .then(response => {
        onUpdate(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Erro ao atualizar ninja:', error));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/ninjas/deletar/${ninja.id}`)
      .then(() => onDelete(ninja.id))
      .catch(error => console.error('Erro ao deletar ninja:', error));
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <input type="text" name="rank" value={formData.rank} onChange={handleChange} />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h3>{ninja.nome}</h3>
          <p>Email: {ninja.email}</p>
          <p>Rank: {ninja.rank}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Deletar</button>
        </div>
      )}
    </li>
  );
};

export default NinjaItem;
