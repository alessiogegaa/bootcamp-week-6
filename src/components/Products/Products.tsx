import React from 'react';
import { Box } from '@mui/material';
import ProductCard from './ProductsCard';

interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: 'var(--background-color)', 
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          paddingBottom: 2,
          justifyContent: 'flex-start',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              backgroundColor: 'var(--background-color)', 
              border: `1px solid var(--line-color)`, 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              description={product.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
