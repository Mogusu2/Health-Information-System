import React, { useState } from 'react';
import axios from 'axios';

function RegisterClient() {
  const [clientName, setClientName] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/clients', {
        name: clientName,
        age: parseInt(clientAge, 10),
        contact: clientContact,
        email: clientEmail,
      });
      console.log('Client Registered:', response.data);

      setShowSuccessModal(true);

      
      setClientName('');
      setClientAge('');
      setClientContact('');
      setClientEmail('');

    } catch (err) {
      setError('Error registering client. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Register New Client</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clientName" className="form-label">Client Name</label>
            <input
              type="text"
              id="clientName"
              className="form-control"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientAge" className="form-label">Client Age</label>
            <input
              type="number"
              id="clientAge"
              className="form-control"
              value={clientAge}
              onChange={(e) => setClientAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientContact" className="form-label">Client Contact</label>
            <input
              type="text"
              id="clientContact"
              className="form-control"
              value={clientContact}
              onChange={(e) => setClientContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientEmail" className="form-label">Client Email</label>
            <input
              type="email"
              id="clientEmail"
              className="form-control"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register Client'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Successful</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>The client has been registered successfully!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={closeModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
          {/* backdrop */}
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default RegisterClient;
