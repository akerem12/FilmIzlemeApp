import { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useNavigate } from "react-router-dom";
import { createFilm } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { FilmCreateDto, FilmUpdateDto } from "../types";
import FilmForm from "../components/FilmForm";
import { GOLD } from "../theme";

export default function FilmCreatePage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (dto: FilmCreateDto | FilmUpdateDto) => {
    if (!user) return;
    setSubmitting(true);
    setError(null);
    try {
      await createFilm(dto as FilmCreateDto, user.id);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Film eklenemedi."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        className="fade-in-up"
        elevation={0}
        sx={{ p: 4, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <MovieCreationIcon sx={{ color: GOLD, fontSize: 30 }} />
          <Typography variant="h5">Yeni Film Ekle</Typography>
        </Box>
        <FilmForm mode="create" onSubmit={handleSubmit} submitting={submitting} error={error} />
      </Paper>
    </Container>
  );
}
