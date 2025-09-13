import React, { useState } from 'react';
import { Button, TextField, MenuItem, Checkbox, FormControlLabel, Typography, Box, InputLabel, Select, FormControl } from '@mui/material';

const workTypes = [
  'Maid',
  'Baby care',
  'Cook',
  'Driver',
  'Patient care',
  'Bathroom cleaning',
  'Other',
];


const startTimes = [
  '5:00 AM','6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];
const endTimes = [
  '6:00 AM','7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
  '10:00 PM', '11:00 PM', '24 hours',
];


function MaidForm({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: 'Female',
    workType: ['Maid'],
    location: ['Magarpatta'],
    startTime: '7:00 AM',
    endTime: '8:00 AM',
    anywhere: false,
    photo: null,
    remarks: '',
    feedback: '',
    available: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleWorkTypeChange = (e) => {
    setForm((prev) => ({ ...prev, workType: e.target.value }));
  };

  const [photoMsg, setPhotoMsg] = useState('');
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, photo: file }));
    if (file) {
      setPhotoMsg('Photo uploaded successfully!');
    } else {
      setPhotoMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  formData.append('phone', form.phone);
  formData.append('name', form.name);
  formData.append('gender', form.gender);
  formData.append('workType', form.workType.join(','));
  formData.append('startTime', form.startTime);
  formData.append('endTime', form.endTime);
  formData.append('location', form.location.join ? form.location.join(',') : form.location);
  formData.append('living', form.anywhere ? 1 : 0);
  formData.append('remarks', form.remarks || '');
  formData.append('feedback', form.feedback || '');
  formData.append('available', parseInt(form.available, 10));
    if (form.photo) {
      formData.append('photoPath', form.photo.name);
      formData.append('photo', form.photo);
    } else {
      formData.append('photoPath', '');
    }
    try {
  const response = await fetch('http://192.168.1.4:5000/api/maids', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Registration successful!');
        setForm({
          name: '',
          phone: '',
          workType: [],
          location: [],
          startTime: '7:00 AM',
          endTime: '8:00 AM',
          anywhere: false,
          photo: null,
          remarks: '',
          feedback: '',
          available: '',
        });
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
      <Typography variant="h6" gutterBottom>Maid Registration</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Phone number(10 digit)" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type of work</InputLabel>
        <Select
          multiple
          value={form.workType}
          onChange={handleWorkTypeChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {workTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={form.workType.indexOf(type) > -1} />
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" gap={2} marginY={2}>
        <FormControl fullWidth>
          <InputLabel>Available Start Time</InputLabel>
          <Select
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          >
            {startTimes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Available End Time</InputLabel>
          <Select
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          >
            {endTimes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="location-label">Preferred location</InputLabel>
        <Select
          labelId="location-label"
          multiple
          name="location"
          value={form.location}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, location: e.target.value }));
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {['Magarpatta', 'Amanora', 'Kharadi', 'Hadapsar', 'Manjri', 'No preference', 'Other'].map((loc) => (
            <MenuItem key={loc} value={loc}>
              <Checkbox checked={form.location.indexOf(loc) > -1} />
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField
          label="Remarks"
          name="remarks"
          value={form.remarks || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
      <FormControlLabel
        control={<Checkbox name="anywhere" checked={form.anywhere} onChange={handleChange} />}
        label="24 hours live-in house help"
      />
      <Box marginY={2}>
        <label htmlFor="photo-upload">
          <Button variant="outlined" component="span">
            Upload photo
          </Button>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          style={{ display: 'none' }}
        />
        {photoMsg && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>{photoMsg}</Typography>
        )}
      </Box>
      <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
      <Button onClick={onBack} fullWidth style={{ marginTop: 8 }}>Back</Button>
    </form>
  );
}

export default MaidForm;
