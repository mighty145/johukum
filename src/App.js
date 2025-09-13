import React, { useState } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import MaidForm from './MaidForm';
import OwnerForm from './OwnerForm';
import Login from './Login';

import HomePage from './HomePage';

function App() {
  const [role, setRole] = useState(null);
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Paper elevation={3} style={{ padding: 24 }}>
        {!role && (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>Welcome to MAIDFINDER</Typography>
            <Box display="flex" justifyContent="center" gap={2} marginY={2}>
            <img src={process.env.PUBLIC_URL + "/assets/broom.png"} alt="Broom Icon" style={{ width: 60, height: 60 }} />
            <img src={process.env.PUBLIC_URL + "/assets/driver-cap.png"} alt="Driver Cap Icon" style={{ width: 60, height: 60 }} />
          </Box>
          <Button variant="contained" color="primary" fullWidth style={{ marginBottom: 16 }} onClick={() => setRole('maid')}>
            I am looking for work
          </Button>
          <Button variant="contained" color="secondary" fullWidth onClick={() => setRole('owner')}>
            I am looking for house help
          </Button>
          </Box>
        )}
        {role === 'maid' && <MaidForm onBack={() => setRole(null)} />}
        {role === 'owner' && !showOwnerForm && !loggedIn && (
          <Login
            onLogin={() => setLoggedIn(true)}
            onRegister={() => setShowOwnerForm(true)}
            onBack={() => setRole(null)}
          />
        )}
        {role === 'owner' && !showOwnerForm && loggedIn && (
          <HomePage onBack={() => { setLoggedIn(false); setRole(null); }} />
        )}
        {role === 'owner' && showOwnerForm && <OwnerForm onBack={() => { setRole(null); setShowOwnerForm(false); }} />}
      </Paper>
    </Container>
  );
}

export default App;
