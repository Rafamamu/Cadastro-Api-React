import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NinjaDetail = () => {
  const { id } = useParams();
  const [ninja, setNinja] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/ninjas/${id}`)
      .then(response => setNinja(response.data))
      .catch(error => console.error('Erro ao buscar ninja:', error));
  }, [id]);

  if (!ninja) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>{ninja.nome}</h2>
      <p>Email: {ninja.email}</p>
      <p>Rank: {ninja.rank}</p>
    </div>
  );
};

export default NinjaDetail;
