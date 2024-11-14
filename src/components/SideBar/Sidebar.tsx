import FormControlLabel from "@mui/material/FormControlLabel";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from "@mui/material/ListItemText";
import Slider from '@mui/material/Slider';
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import { useCart } from "../../context/Cart/CartContext";

const SidebarContainer = styled(Box)({
  width: '1000px',
  padding: "20px",
  backgroundColor: "var(--background-color)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
});

const CategoryTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "var(--text-color)", 
  marginBottom: "10px",
});

const Sidebar = () => {
  const {productCategories,getProductFromApi} = useCart();
  return (
    <SidebarContainer>
      <CategoryTitle variant="h6">Categories</CategoryTitle>
      <List>
        {productCategories.map((category) => (
          <ListItem key={category} component="li">
            <ListItemText primary={category} onClick={()=>getProductFromApi(category.toLowerCase())}/>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 2 }} />

      <CategoryTitle variant="h6">Filter by Price</CategoryTitle>
      <Box sx={{ paddingX: 2, marginTop: 1 }}>
        <Slider
          defaultValue={50}
          aria-labelledby="price-range"
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{
            color: "var(--accent-color)", 
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">$0</Typography>
          <Typography variant="body2">$500</Typography>
        </Box>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <CategoryTitle variant="h6">Filter by Color</CategoryTitle>
      <FormControl component="fieldset" sx={{ marginLeft: 1 }}>
        <FormGroup>
          {["Black", "White", "Blue", "Red", "Green", "Yellow"].map((color) => (
            <FormControlLabel
              key={color}
              control={<Checkbox sx={{ color: "var(--accent-color)" }} />} 
              label={color}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Divider sx={{ marginY: 2 }} />

      <CategoryTitle variant="h6">Filter by Brand</CategoryTitle>
      <List>
        {["Nike", "Adidas", "Puma", "Reebok", "Under Armour"].map((brand) => (
          <ListItem key={brand} component="li">
            <ListItemText primary={brand} />
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
