import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const orders = [
  { date: "2026-03-01", total: 500, product: "Mango" },
  { date: "2026-03-02", total: 800, product: "Apple" },
  { date: "2026-03-03", total: 300, product: "Mango" },
  { date: "2026-03-04", total: 1000, product: "Banana" },
];

const AdminSales = () => {

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const productMap = {};
  orders.forEach((o) => {
    productMap[o.product] =
      (productMap[o.product] || 0) + o.total;
  });

  const productData = Object.keys(productMap).map((key) => ({
    name: key,
    sales: productMap[key],
  }));

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: 600,
          mb: 3,
          color: "#1f2937",
        }}
      >
        Sales Analytics Dashboard
      </Typography>

      {/* CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #ff7e5f, #feb47b)",
              color: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
                Total Revenue
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                ₹{totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
                Total Orders
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* LINE CHART */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            mb: 2,
            color: "#374151",
          }}
        >
          Sales Over Time
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orders}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="total" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* BAR CHART */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            mb: 2,
            color: "#374151",
          }}
        >
          Top Products
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="sales" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AdminSales;