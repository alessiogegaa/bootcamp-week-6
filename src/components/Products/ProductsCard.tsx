import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

  import { useCart } from "../../context/Cart/CartContext";
  
  type ProductCardType = {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
    description: string;
  };
  
  const ProductCard: React.FC<ProductCardType> = ({
    id,
    title,
    price,
    imageUrl,
    description,
  }) => {
    const { quantities, increaseQuantity, decreaseQuantity, addToCart } = useCart();
  
    return (
      <Card
        sx={{
          width: 300,
          height: 350,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'var(--background-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          margin: 0,
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt={title}
          sx={{
            objectFit: "contain",
            width: "100%",
            height: "100",
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
            width: "100%",
            color: 'var(--text-color)',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "normal",
              textAlign: "center",
              color: 'var(--text-color-active)',
            }}
          >
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: 1,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "normal",
              textAlign: "center",
              color: 'var(--text-color)',
            }}
          >
            {description.length > 30 ? `${description.slice(0, 30)}...` : description}
          </Typography>
  
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              fontWeight: "bold",
              color: 'var(--accent-color)',
            }}
          >
            {price}
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
              onClick={() => decreaseQuantity(id)}
              sx={{
                padding: "5px 12px",
                minWidth: "30px",
                fontSize: "1.2rem",
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              }}
            >
              -
            </Button>
            <Typography variant="body2" sx={{ color: 'var(--text-color)' }}>
              {quantities[id] || 1}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => increaseQuantity(id)}
              sx={{
                padding: "5px 12px",
                minWidth: "30px",
                fontSize: "1.2rem",
                color: 'var(--text-color)',
                borderColor: 'var(--line-color)',
              }}
            >
              +
            </Button>
          </div>
  
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: 'var(--accent-color)',
              color: 'var(--text-color-active)',
              '&:hover': {
                backgroundColor: 'var(--accent-color)',
                opacity: 0.9,
              },
            }}
            onClick={() => addToCart(id)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default ProductCard;
  