import React, { useState } from 'react';
import axios from 'axios';

const NinjaForm = ({ onSave }) => {
  const [formData, setFormData] = useState({ nome: '', email: '', rank: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/ninjas/criar', formData)
      .then(response => {
        onSave(response.data);
        setMessage('Cadastro concluído com sucesso!');
        setFormData({ nome: '', email: '', rank: '' }); // Limpar os campos do formulário
      })
      .catch(error => {
        console.error('Erro ao salvar ninja:', error);
        setMessage('Erro ao salvar ninja. Tente novamente.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" required />
        <button type="submit">Salvar</button>
      </form>
      {message && <p>{message}</p>} {/* Exibir mensagem de feedback */}
    </div>
  );
};

export default NinjaForm;
