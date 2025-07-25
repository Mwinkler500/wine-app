import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WineLogbook() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    axios.get('/api/userWines')
      .then(res => setWines(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Past Wines</h2>
      {wines.map(wine => (
        <div key={wine._id}>
          <img src={wine.image} alt={wine.name} width="100" />
          <h3>{wine.name}</h3>
          <p>{wine.notes}</p>
          <a href={wine.shopifyLink} target="_blank" rel="noopener noreferrer">Buy Again</a>
        </div>
      ))}
    </div>
  );
}

export default WineLogbook;