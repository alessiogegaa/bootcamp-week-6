import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useCart } from "../../context/Cart/CartContext";

const StyledCard = styled(Card)({
  display: "flex",
  borderRadius: "12px",
  overflow: "hidden",
  marginBottom: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const CheckoutButton = styled(Button)({
  backgroundColor: "#28a745",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#218838",
  },
  padding: "12px 0",
  borderRadius: "8px",
});

const InfoTypography = styled(Typography)({
  fontSize: "14px",
  color: "#6c757d",
});

const TotalPriceBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
});

const CartPage: React.FC = () => {
  const {
    getAllProductsInCart,
    removeFromCart,
    getTotalPrice,
    increaseQuantityInsideCart,
    decreaseQuantityInsideCart,
    generateInvoice
  } = useCart();

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            My Bag
          </Typography>
          <InfoTypography display="block" sx={{ marginBottom: 2 }}>
            Items are reserved for 60 minutes
          </InfoTypography>
          <Divider sx={{ marginBottom: 3 }} />

          {getAllProductsInCart().length > 0 ? (
            getAllProductsInCart().map((item) => (
              <StyledCard key={item.id}>
                <CardMedia
                  component="img"
                  image={item.imageUrl}
                  alt={item.title}
                  sx={{ width: 150 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "500" }}>
                    {item.title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: 12,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => decreaseQuantityInsideCart(item.id)}
                      sx={{
                        padding: "5px 12px",
                        minWidth: "30px",
                        fontSize: "1.2rem",
                      }}
                    >
                      -
                    </Button>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => increaseQuantityInsideCart(item.id)}
                      sx={{
                        padding: "5px 12px",
                        minWidth: "30px",
                        fontSize: "1.2rem",
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {item.price}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => console.log("Save for later clicked")}
                    sx={{ marginRight: 2 }}
                  >
                    Save for later
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </StyledCard>
            ))
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              Your cart is empty.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Total
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <TotalPriceBox>
              <Typography>Sub-total</Typography>
              <Typography>
                {getTotalPrice() > 0 ? `$${getTotalPrice()}` : "$0"}
              </Typography>
            </TotalPriceBox>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Delivery</InputLabel>
              <Select defaultValue="Free">
                <MenuItem value="Free">Standard Delivery (Free)</MenuItem>
                <MenuItem value="Express">Express Delivery (£5.00)</MenuItem>
              </Select>
            </FormControl>
            <CheckoutButton variant="contained" fullWidth onClick={()=>generateInvoice()}>
              Checkout
            </CheckoutButton>
            <InfoTypography sx={{ marginTop: 2 }}>
              Got a discount code? Add it in the next step.
            </InfoTypography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
