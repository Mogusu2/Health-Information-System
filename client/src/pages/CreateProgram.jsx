import React, { useState } from 'react';
import axios from 'axios';

function CreateProgram() {
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/programs', {
        name: programName,
        description: programDescription,
      });
      console.log('Program Created:', response.data);
      
    } catch (err) {
      setError('Error creating program. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Create Health Program</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="programName" className="form-label">Program Name</label>
            <input
              type="text"
              id="programName"
              className="form-control"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="programDescription" className="form-label">Description</label>
            <textarea
              id="programDescription"
              className="form-control"
              rows="4"
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Program'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProgram;
