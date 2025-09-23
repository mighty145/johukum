import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

function OwnerForm({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await fetch('http://192.168.1.4:5000/api/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Registration successful!');
        setForm({ name: '', location: '', phone: '' });
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      alert('Error submitting form.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Owner Registration</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
  <TextField label="Location" name="location" value={form.location} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Phone number" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
      <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
      <Button onClick={onBack} fullWidth style={{ marginTop: 8 }}>Back</Button>
    </form>
  );
}

export default OwnerForm;
