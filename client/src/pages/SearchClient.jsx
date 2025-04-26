import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clients')
      .then(res => {
        setClients(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch clients. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Search Clients</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ul className="list-group">
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <li key={client.id} className="list-group-item">
                  <strong>{client.name}</strong><br />
                  <small>
                    Age: {client.age} | Contact: {client.contact} | Email: {client.email}
                  </small><br />
                  {client.programs?.length > 0 && (
                    <em>Programs: {client.programs.map(p => p.name).join(', ')}</em>
                  )}
                </li>
              ))
            ) : (
              <li className="list-group-item">No clients found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchClients;
