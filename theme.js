import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#80d0c7',
      contrastText: '#fff',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255,255,255,0.8)',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)',
          backdropFilter: 'blur(8px) saturate(180%)',
          WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
