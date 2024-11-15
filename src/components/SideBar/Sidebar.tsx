import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from "@mui/material/ListItemText";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled } from "@mui/material/styles";
import { useCart } from "../../context/Cart/CartContext";
import { useState } from 'react';

const SidebarContainer = styled(Box)({
  width: '1000px',
  padding: "20px",
  backgroundColor: "var(--background-color)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  height: '100vh'
});

const CategoryTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "var(--text-color)", 
  marginBottom: "10px",
});

const Sidebar = () => {
  const {productCategories,getProductFromApi} = useCart();
  const [order,setOrder] = useState<string>('DSC');
  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
    getProductFromApi()
  };

  return (
    <SidebarContainer >
      <CategoryTitle variant="h6">Categories</CategoryTitle>
      <List>
        {productCategories.map((category) => (
          <ListItem key={category} component="li">
            <ListItemText primary={category} onClick={()=>getProductFromApi(category.toLowerCase())}/>
          </ListItem>
        ))}
      </List>
     
    </SidebarContainer>
  );
};

export default Sidebar;
