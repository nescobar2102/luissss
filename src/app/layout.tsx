// app/layout.tsx

'use client';
import Header from './components/Header';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme'; // Ajusta el path si está en otra carpeta
 
import styles from '../styles/Globals.module.css'; // Usa módulos CSS
import '../../src/app/page.module.css'; // tus estilos globales
import React from 'react';

 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <Header />
      <body className={styles.body}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}