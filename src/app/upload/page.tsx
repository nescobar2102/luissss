'use client';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Paper, Box, Modal, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

// Mock API call for document upload. Replace with your actual API integration.
const uploadDocumentApi = async (file: File, documentType: string): Promise<{ success: boolean; message?: string; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (file.name.includes('error')) { // Simulate an upload error
        resolve({ success: false, error: `Error al subir el documento ${documentType}.` });
      } else {
        console.log(`Uploading ${documentType}: ${file.name}`);
        resolve({ success: true, message: `${documentType} subido exitosamente.` });
      }
    }, 1500); // Simulate network delay
  });
};

interface DocumentStatus {
  file: File | null;
  uploaded: boolean;
  error: string | null;
  loading: boolean;
}

export default function DocumentUpload() {
  const [document1, setDocument1] = useState<DocumentStatus>({ file: null, uploaded: false, error: null, loading: false });
  const [document2, setDocument2] = useState<DocumentStatus>({ file: null, uploaded: false, error: null, loading: false });
  const [document3, setDocument3] = useState<DocumentStatus>({ file: null, uploaded: false, error: null, loading: false });
  const [allDocumentsUploaded, setAllDocumentsUploaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if all documents are uploaded
    setAllDocumentsUploaded(document1.uploaded && document2.uploaded && document3.uploaded);
  }, [document1.uploaded, document2.uploaded, document3.uploaded]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setDocument: React.Dispatch<React.SetStateAction<DocumentStatus>>) => {
    if (event.target.files && event.target.files[0]) {
      setDocument(prev => ({ ...prev, file: event.target.files![0], error: null }));
    }
  };

  const handleUpload = async (documentType: string, documentStatus: DocumentStatus, setDocument: React.Dispatch<React.SetStateAction<DocumentStatus>>) => {
    if (!documentStatus.file) {
      setDocument(prev => ({ ...prev, error: 'Por favor, seleccione un archivo primero.' }));
      return;
    }

    setDocument(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await uploadDocumentApi(documentStatus.file, documentType);
      if (response.success) {
        setDocument(prev => ({ ...prev, uploaded: true, loading: false }));
      } else {
        setDocument(prev => ({ ...prev, uploaded: false, error: response.error || 'Error desconocido al subir el documento.', loading: false }));
      }
    } catch (err: any) {
      setDocument(prev => ({ ...prev, uploaded: false, error: err.message || 'Error en la conexión al subir el documento.', loading: false }));
    }
  };

  const handleNext = () => {
    setOpenModal(true);
    // In a real application, you might navigate to the next page here:
    // router.push('/next-page');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Example: redirect to home or dashboard after successful upload
    router.push('/');
  };

  const renderDocumentUploader = (documentType: string, documentStatus: DocumentStatus, setDocument: React.Dispatch<React.SetStateAction<DocumentStatus>>) => (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>{documentType}</Typography>
      <input
        accept="image/*,.pdf" // Example: allow images and PDFs
        style={{ display: 'none' }}
        id={`upload-button-${documentType}`}
        type="file"
        onChange={(e) => handleFileChange(e, setDocument)}
      />
      <label htmlFor={`upload-button-${documentType}`}>
        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} disabled={documentStatus.uploaded || documentStatus.loading}>
          Seleccionar Archivo
        </Button>
      </label>
      {documentStatus.file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Archivo seleccionado: **{documentStatus.file.name}**
        </Typography>
      )}
      {documentStatus.loading && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Subiendo...</Typography>
        </Box>
      )}
      {documentStatus.error && (
        <Typography color="error" sx={{ mt: 1 }}>{documentStatus.error}</Typography>
      )}
      {documentStatus.uploaded && (
        <Box display="flex" alignItems="center" sx={{ mt: 1, color: 'success.main' }}>
          <CheckCircleIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2">¡Subido!</Typography>
        </Box>
      )}
      {!documentStatus.uploaded && documentStatus.file && !documentStatus.loading && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleUpload(documentType, documentStatus, setDocument)}
          sx={{ mt: 2 }}
          disabled={!documentStatus.file || documentStatus.loading}
        >
          Subir {documentType.split(' ')[0]}
        </Button>
      )}
    </Box>
  );

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '16px' }}>
                <Typography variant="h5" sx={{ mb: 3, color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
                 Subida de Documentos
                  </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Por favor, sube los 3 tipos de documentos requeridos para continuar.
        </Typography>

        {renderDocumentUploader("Documento de Identidad", document1, setDocument1)}
        {renderDocumentUploader("Comprobante de Domicilio", document2, setDocument2)}
        {renderDocumentUploader("Copia de Contrato Firmado", document3, setDocument3)}

        <Box display="flex" justifyContent="flex-end" marginTop={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!allDocumentsUploaded}
            size="large"
            sx={{
              borderRadius:'20px',
              padding: '10px 30px',
              backgroundColor: allDocumentsUploaded ? '#4caf50' : '#a5d6a7', // Green when enabled, lighter green when disabled
              '&:hover': {
                backgroundColor: allDocumentsUploaded ? '#388e3c' : '#a5d6a7',
              },
            }}
          >
            Siguiente
          </Button>
        </Box>
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="upload-success-modal-title"
        aria-describedby="upload-success-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            borderRadius: '8px'
          }}>
          <Typography variant="h6" id="upload-success-modal-title" color="primary">¡Documentos Subidos!</Typography>
          <Typography variant="body1" id="upload-success-modal-description" sx={{ marginTop: 2 }}>
            Todos tus documentos han sido cargados exitosamente.
          </Typography>
          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 3,
              backgroundColor: '#800020',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}>
            Aceptar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}