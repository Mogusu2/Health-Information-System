import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EnrollClient() {
  const [programs, setPrograms] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  useEffect(() => {
    const fetchProgramsAndClients = async () => {
      try {
        const [programRes, clientRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/programs'),
          axios.get('http://127.0.0.1:8000/clients')
        ]);

        setPrograms(programRes.data);
        setClients(clientRes.data);

      } catch (err) {
        console.error('Error fetching programs or clients:', err);
        setError('Failed to load programs or clients.');
      }
    };

    fetchProgramsAndClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/enroll', {
        program: selectedProgram,
        clientId: selectedClient, 
      });

      console.log('Client Enrolled:', response.data);
      setSuccess('Client successfully enrolled!');
      setSelectedProgram('');
      setSelectedClient('');

    } catch (err) {
      console.error('API Error:', err);
      setError('Error enrolling client. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4 animate__animated animate__fadeInUp">
      <div className="card-header bg-primary text-white">
        <h3>Enroll Client in Program</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Client Selection */}
          <div className="mb-3">
            <label htmlFor="clientSelect" className="form-label">Select Client</label>
            <select
              id="clientSelect"
              className="form-select"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
            >
              <option value="">Select a Client</option>

              {clients.sort((a, b) => a.name.localeCompare(b.name)).map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} (ID: {client.id})
                </option>
              ))}
            </select>
          </div>

          {/* Program Selection */}
          <div className="mb-3">
            <label htmlFor="programSelect" className="form-label">Select Program</label>
            <select
              id="programSelect"
              className="form-select"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              required
            >
              <option value="">Select a Program</option>

              {programs.sort((a, b) => a.name.localeCompare(b.name)).map((program) => (
                <option key={program.id} value={program.name}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Enrolling...
              </>
            ) : (
              'Enroll Client'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnrollClient;
