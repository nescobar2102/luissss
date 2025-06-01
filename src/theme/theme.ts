// src/theme/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0099dd', // Color rojo para botones principales
    },
    secondary: {
      main: '#d0cdc1', // Gris claro
    },
    text: {
      primary: '#000', // Texto principal
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#b0bec5', // Botón por defecto gris claro
          color: '#000',
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#0099dd',
            color: '#fff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          '& .MuiInputBase-input': {
            color: '#000',
          },
        },
      },
    },
  },
});

export default theme;
