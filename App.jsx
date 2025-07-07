import React, { useState } from 'react';
import {Container,TextField,Button,Typography,Box,Paper,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [long_Url, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validityMinutes, setValidityMinutes] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleShortenUrl = async () => {
    setLoading(true);
    try {
      const payload = {
        url: long_Url,
        validity: validityMinutes ? parseInt(validityMinutes) : undefined,
        shortCode: customCode || undefined,
      };

      const response = await axios.post('http://localhost:3000/shorturls', payload);
      setShortUrl(response.data.shortUrl);
      setErrorMessage('');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong==>Pls try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className='container'>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h4" gutterBottom className="fade-in delay-1 ">
            URL Shortener
          </Typography>
        </Box>

        {errorMessage && (
          <Box mb={2} className="fade-in delay-2">
            <Typography color="error" variant="body1">
              {errorMessage}
            </Typography>
          </Box>
        )}

        <TextField
          label="Enter Long URL"
          fullWidth
          margin="normal"
          value={long_Url}
          onChange={(e) => setLongUrl(e.target.value)}
          className="fade-in delay-2"
        />

        <TextField
          label="Custom Short Code (optional)"
          fullWidth
          margin="normal"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="fade-in delay-3"
        />

        <TextField
          label="Validity Enter in minutes"
          type="number"
          fullWidth
          margin="normal"
          value={validityMinutes}
          onChange={(e) => setValidityMinutes(e.target.value)}
          className="fade-in delay-4"
        />

        <Box mt={2} className="fade-in delay-4">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleShortenUrl}
            sx={{ minHeight: 48, fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Get Your URL'}
          </Button>
        </Box>

        {shortUrl && (
          <Box mt={6} className="fade-in delay-4">
            <Typography variant="h6">Your Short URL:</Typography>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
