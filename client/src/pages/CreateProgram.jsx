import React, { useState } from 'react';
import api from '../api/axios';
import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material';

function CreateProgram() {
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await api.post('/programs', {
        name: programName,
        description: programDescription,
      });

      console.log('Program Created:', response.data);
      setSuccessMessage('Health Program created successfully!');
      setProgramName('');
      setProgramDescription('');
    } catch (err) {
      setError('Error creating program. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Create Health Program
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Program Name"
            fullWidth
            margin="normal"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
          <TextField
            label="Program Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={programDescription}
            onChange={(e) => setProgramDescription(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Creating...' : 'Create Program'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateProgram;
