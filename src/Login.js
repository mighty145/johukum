import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Login({ onLogin, onRegister, onBack }) {
  const [mobile, setMobile] = useState('');
  const [notRegistered, setNotRegistered] = useState(false);

  const handleLogin = () => {
    if (!mobile) {
      alert('Please enter your registered mobile number');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10 digit mobile number.');
      return;
    }
    setNotRegistered(false);
    if (onLogin) onLogin(mobile);
  };

  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <TextField
        label="Mobile Number(10 digit)"
        variant="outlined"
        fullWidth
        value={mobile}
        onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
        inputProps={{ maxLength: 10 }}
        style={{ marginBottom: 24 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: 16 }}
        onClick={handleLogin}
      >
        LOGIN
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        style={{ marginBottom: 16 }}
        onClick={onRegister}
      >
        REGISTER
      </Button>
      <Button
        variant="text"
        fullWidth
        onClick={onBack}
      >
        BACK TO HOME
      </Button>
      {notRegistered && (
        <Typography color="error" sx={{ mt: 2 }}>
          Mobile number not registered. Please register first.
        </Typography>
      )}
    </Box>
  );
}
              {/* Search Bar */}
              <Box sx={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, #e3f0e8 0%, #f8fafc 100%)', borderRadius: 2, px: 2, py: 1, mb: 3, boxShadow: 1, maxWidth: 600, mx: 'auto', border: '1px solid #b2c9ab' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search by name, profession, or location..."
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', width: '100%', color: '#4b6043' }}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </Box>
              {/* Filters */}
              <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                <TextField select label="Type of Work" value={filterWorkType} onChange={e => setFilterWorkType(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
                  <option value="">All</option>
                  {workTypeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </TextField>
                <TextField select label="Location" value={filterLocation} onChange={e => setFilterLocation(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
                  <option value="">All</option>
                  {locationOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </TextField>
                <TextField select label="Available Start Time" value={filterStartTime} onChange={e => setFilterStartTime(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
                  <option value="">All</option>
                  {startTimeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </TextField>
                <TextField select label="Living Help" value={filterLiving} onChange={e => setFilterLiving(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </TextField>
              </Box>
              {/* Maids List */}
              {searchedMaids.length === 0 ? (
                <Typography>No maids found.</Typography>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  {searchedMaids.map((maid, idx) => (
                    <Grid item xs={12} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Card sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 2,
                        width: 400,
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        position: 'relative',
                        background: 'linear-gradient(120deg, #f7fbe7 0%, #e3f0e8 100%)',
                        border: '1px solid #b2c9ab',
                      }}>
                        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                          {maid.photoPath ? (
                            <Avatar
                              src={maid.photoPath.startsWith('http') ? maid.photoPath : `http://192.168.1.4:5000/uploads/${maid.photoPath}`}
                              alt={maid.name}
                              sx={{ width: 56, height: 56 }}
                            />
                          ) : (
                            <Avatar sx={{ width: 56, height: 56 }}>{maid.name ? maid.name[0] : '?'}</Avatar>
                          )}
                        </Box>
                        <Box sx={{ flex: 1, position: 'relative', pl: 0, pr: 0 }}>
                          <CardHeader
                            avatar={null}
                            title={
                              <>
                                <div style={{ textAlign: 'left' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'left', wordBreak: 'break-word', color: '#4b6043' }}>{maid.name}</Typography>
                                  </div>
                                  <Typography variant="body1" sx={{ textAlign: 'left', wordBreak: 'break-word', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4M8 3v4M2 11h20"></path></svg>
                                    </span>
                                    <span style={{ fontWeight: 'normal', color: '#4b6043' }}>{maid.workType}</span>
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#7c9473', background: 'linear-gradient(120deg, #f7fbe7 0%, #e3f0e8 100%)', px: 1, borderRadius: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
                                    {maid.gender === 'Female' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
                                    ) : maid.gender === 'Male' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><circle cx="9" cy="15" r="6"/><path d="M16 8V3h-5"/><line x1="16" y1="3" x2="21" y2="8"/></svg>
                                    ) : null}
                                    {maid.gender}
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                                    <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}><b>Preferred Location:</b> {maid.location}</Typography>
                                    <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5 }}><b>Availability -</b> {maid.startTime || ''} to {maid.endTime || ''}</Typography>
                                    {(maid.anywhere === true || maid.anywhere === 1 || maid.living === 1) && (
                                      <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}><b>Living:</b> Yes</Typography>
                                    )}
                                    {maid.remarks && (
                                      <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5 }}><b>Remarks:</b> {maid.remarks}</Typography>
                                    )}
                                  </Box>
                                  <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ConnectButton maid={maid} />
                                  </Box>
                                </div>
                              </>
                            }
                            subheader={null}
                            sx={{ textAlign: 'left' }}
                          />
                        </Box>
                        <CardContent sx={{ textAlign: 'left', wordBreak: 'break-word' }}>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button variant="text" color="inherit" fullWidth style={{ marginTop: 32 }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onBack(); }}>
                Back to Home
              </Button>

