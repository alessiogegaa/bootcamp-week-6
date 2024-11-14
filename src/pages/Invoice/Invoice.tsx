import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/system';
import { useNavigate} from 'react-router-dom';

const StyledPaper = styled(Paper)({
  padding: '20px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  marginBottom: '20px',
});

const TitleTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
  fontSize: '24px',
});

const InfoTypography = styled(Typography)({
  fontSize: '14px',
  color: '#6c757d',
  marginBottom: '10px',
});

const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Array<any>>([]);

  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    setInvoices(savedInvoices);
  }, []);

  const handleInvoiceClick = (id: string) => {
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  };

  return (
    <Box sx={{ padding: '40px' }}>
      {!selectedInvoice ? (
        <StyledPaper>
          <TitleTypography variant="h4">Invoices</TitleTypography>
          <Divider sx={{ marginBottom: '20px' }} />
          {invoices.length > 0 ? (
            <List>
              {invoices.map((invoice) => (
                <ListItem
                  key={invoice.id}
                  onClick={() => handleInvoiceClick(invoice.id)}
                >
                  <ListItemText
                    primary={`Invoice #${invoice.invoiceNumber}`}
                    secondary={`Date: ${invoice.date}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <InfoTypography>No invoices found.</InfoTypography>
          )}
        </StyledPaper>
      ) : (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box>
              <TitleTypography variant="h4">Invoice #{selectedInvoice.invoiceNumber}</TitleTypography>
              <InfoTypography>Date: {selectedInvoice.date}</InfoTypography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <TitleTypography variant="h5">Billing Information</TitleTypography>
              <InfoTypography>{selectedInvoice.customerName}</InfoTypography>
              <InfoTypography>{selectedInvoice.address}</InfoTypography>
            </Box>
          </Box>

          <Divider sx={{ marginBottom: '20px' }} />

          <Box sx={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: '10px', fontWeight: 'bold' }}>
              <Box>Product</Box>
              <Box>Quantity</Box>
              <Box>Total</Box>
            </Box>
            {selectedInvoice.products.map((product: any, index: number) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }} key={index}>
                <Box>{product.title}</Box>
                <Box>{product.quantity}</Box>
                <Box>{product.total}</Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total: {selectedInvoice.totalPrice}
            </Typography>
          </Box>

          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
          </Box>
        </StyledPaper>
      )}
    </Box>
  );
};

export default InvoicePage;
