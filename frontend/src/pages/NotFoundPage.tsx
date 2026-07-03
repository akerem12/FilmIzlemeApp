import { Container, Typography, Button, Box } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Link } from "react-router-dom";
import { GOLD } from "../theme";

export default function NotFoundPage() {
  return (
    <Container sx={{ py: 12, textAlign: "center" }} className="fade-in-up">
      <TheatersIcon sx={{ fontSize: 72, color: GOLD, mb: 2 }} />
      <Typography
        sx={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 72,
          letterSpacing: 4,
          lineHeight: 1,
          color: "#fff",
        }}
      >
        404
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Aradığın sahne bu filmde yok gibi görünüyor.
      </Typography>
      <Box>
        <Button component={Link} to="/" variant="contained" size="large">
          Ana Sayfaya Dön
        </Button>
      </Box>
    </Container>
  );
}
