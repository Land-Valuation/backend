import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "../../state/prototypeApi";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LayoutPageCommon from "../../components/LayoutPageCommon";
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const breadcrumbData = [
    { name: 'Home', href: '/' },
    { name: 'MODEL-BASED LAND VALUATION', href: '/products' },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <LayoutPageCommon 
        breadcrumbData={breadcrumbData} 
        title="MODEL-BASED LAND VALUATION"
        actions={ 
          <>
            <Button
              sx={{
                backgroundColor: "#1677FF",
                color: "#fff",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              New Model
            </Button>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#00000073",
                textTransform: "none",
                borderRadius: "6px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                minWidth: '32px',
                minHeight: '32px',
                padding: 0,
              }}
              variant="contained"
            >
              <MoreVertIcon />
            </Button>
          </>
        }
      >
      </LayoutPageCommon>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {(data ?? []).map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
