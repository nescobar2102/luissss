'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useRouter } from 'next/navigation';

// En una aplicación real, esto se cargaría desde tu backend o un contexto de estado global.
// Por ahora, simulamos algunos datos de estado de documentos.
interface DocumentStatus {
  name: string;
  uploaded: boolean;
  error: string | null;
  uploadDate: string | null;
}

const mockDocumentStatuses: DocumentStatus[] = [
  { name: "Documento de Identidad", uploaded: true, error: null, uploadDate: "2025-05-30 10:30 AM" },
  { name: "Comprobante de Domicilio", uploaded: false, error: "El archivo no es legible.", uploadDate: null },
  { name: "Copia de Contrato Firmado", uploaded: true, error: null, uploadDate: "2025-05-31 02:15 PM" },
  { name: "Licencia de Conducir", uploaded: false, error: null, uploadDate: null }, // Ejemplo de un documento pendiente
  { name: "Certificado Bancario", uploaded: true, error: null, uploadDate: "2025-05-29 09:00 AM" },
];

export default function DocumentStatusViewer() {
  const [documents, setDocuments] = useState<DocumentStatus[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simular la carga del estado de los documentos.
    // En una aplicación real, harías una llamada a una API aquí:
    // fetch('/api/document-statuses')
    //   .then(res => res.json())
    //   .then(data => setDocuments(data));
    setDocuments(mockDocumentStatuses);
  }, []);

  const handleGoBack = () => {
    router.push("/"); // Vuelve a la página anterior
  };

  const renderDocumentItem = (doc: DocumentStatus) => (
    <ListItem key={doc.name} sx={{ py: 1.5 }}>
      <ListItemIcon>
        {doc.uploaded ? (
          <CheckCircleIcon color="success" />
        ) : doc.error ? (
          <CancelIcon color="error" />
        ) : (
          <PendingActionsIcon color="action" />
        )}
      </ListItemIcon>
      <ListItemText
        primary={doc.name}
        secondary={
          doc.uploaded
            ? `Subido el: ${doc.uploadDate}`
            : doc.error
              ? `Error: ${doc.error}`
              : 'Pendiente de subir'
        }
        primaryTypographyProps={{ fontWeight: 'medium' }}
        secondaryTypographyProps={{ color: doc.uploaded ? 'text.secondary' : doc.error ? 'error.main' : 'text.secondary' }}
      />
    </ListItem>
  );

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '16px' }}>
         <Typography variant="h5" sx={{ mb: 3, color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
          Estado de Documentos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Aquí puedes ver el estado actual de tus documentos.
        </Typography>

        <List sx={{ width: '100%' }}>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <React.Fragment key={doc.name}>
                {renderDocumentItem(doc)}
                {index < documents.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No se encontraron documentos para mostrar.
            </Typography>
          )}
        </List>

        <Box display="flex" justifyContent="flex-end" marginTop={4}>
          <Button
            variant="contained" color="primary"
            onClick={handleGoBack}
            
          >
            Volver
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}