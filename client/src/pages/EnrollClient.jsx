import React, { useState } from 'react';
import axios from 'axios';

function EnrollClient() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/enroll', {
        program: selectedProgram,
        clientId: 28,
      });
      console.log('Client Enrolled:', response.data);
      
    } catch (err) {
      setError('Error enrolling client. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Enroll Client in Program</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
              <option value="tb">TB</option>
              <option value="malaria">Malaria</option>
              <option value="hiv">HIV</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enrolling...' : 'Enroll Client'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnrollClient;
