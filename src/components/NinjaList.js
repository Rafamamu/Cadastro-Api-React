import React from 'react';
import NinjaItem from './NinjaItem';

const NinjaList = ({ ninjas, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>Lista de Cadastrados</h2>
      <ul>
        {ninjas.map(ninja => (
          <NinjaItem
            key={ninja.id}
            ninja={ninja}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default NinjaList;
