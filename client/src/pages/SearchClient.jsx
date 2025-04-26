// pages/SearchClients.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/clients")
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Search Clients</h2>
      <input
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filtered.map(client => (
          <li key={client.id} className="list-group-item">
            {client.name} - {client.programs?.map(p => p.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchClients;
