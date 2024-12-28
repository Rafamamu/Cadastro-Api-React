import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NinjaList from './components/NinjaList';
import NinjaForm from './components/NinjaForm';
import NinjaDetail from './components/NinjaDetail';

const App = () => {
  const [ninjas, setNinjas] = useState([]);

  const fetchNinjas = () => {
    axios.get('http://localhost:8080/ninjas/listar')
      .then(response => setNinjas(response.data))
      .catch(error => console.error('Erro ao buscar ninjas:', error));
  };

  useEffect(() => {
    fetchNinjas();
  }, []);

  const handleUpdate = (updatedNinja) => {
    setNinjas(ninjas.map(ninja => (ninja.id === updatedNinja.id ? updatedNinja : ninja)));
  };

  const handleDelete = (id) => {
    setNinjas(ninjas.filter(ninja => ninja.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <h1>Cadastro Do Formulário</h1>
        <NinjaForm onSave={fetchNinjas} />
        <Routes>
          <Route path="/" element={<NinjaList ninjas={ninjas} onUpdate={handleUpdate} onDelete={handleDelete} />} />
          <Route path="/ninjas/:id" element={<NinjaDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
