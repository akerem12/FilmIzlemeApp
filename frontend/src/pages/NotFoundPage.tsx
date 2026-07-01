import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sayfa bulunamadı
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Ana Sayfaya Dön
      </Button>
    </Container>
  );
}
