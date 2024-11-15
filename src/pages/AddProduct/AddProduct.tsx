import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

interface ProductFormData {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const AddProduct: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<ProductFormData, 'id'>>(); // Exclude 'id' from the form

  const onSubmit = (data: Omit<ProductFormData, 'id'>) => {
    const newProducts = JSON.parse(localStorage.getItem('newProducts') || '[]');

    const highestID = newProducts.reduce((max: number, product: ProductFormData) => Math.max(max, product.id), 100);
    const newID = highestID + 1;

    const newProduct: ProductFormData = { ...data, id: newID };

    localStorage.setItem('newProducts', JSON.stringify([...newProducts, newProduct]));

    reset();
    alert('Product added successfully!');
  };

  return (
    <Container maxWidth="sm" sx={{ pt: '10px' }}>
      <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
        <Typography variant="h4" style={{ color: 'var(--text-color-active)', textAlign: 'center', marginBottom: '1rem' }}>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Product Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            variant="outlined"
            InputLabelProps={{ style: { color: 'var(--icon-color)' } }}
            InputProps={{
              style: {
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              },
            }}
          />
          <TextField
            label="Description"
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description?.message}
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={{ style: { color: 'var(--icon-color)' } }}
            InputProps={{
              style: {
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              },
            }}
          />
          <TextField
            label="Price"
            type="number"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
            variant="outlined"
            InputLabelProps={{ style: { color: 'var(--icon-color)' } }}
            InputProps={{
              style: {
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              },
            }}
          />
          <TextField
            label="Category"
            {...register("category", { required: "Category is required" })}
            error={!!errors.category}
            helperText={errors.category?.message}
            variant="outlined"
            InputLabelProps={{ style: { color: 'var(--icon-color)' } }}
            InputProps={{
              style: {
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              },
            }}
          />
          <TextField
            label="Image URL"
            {...register("imageUrl", { required: "Image URL is required" })}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
            variant="outlined"
            InputLabelProps={{ style: { color: 'var(--icon-color)' } }}
            InputProps={{
              style: {
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              },
            }}
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--text-color-active)' }}>
            Add Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct;
