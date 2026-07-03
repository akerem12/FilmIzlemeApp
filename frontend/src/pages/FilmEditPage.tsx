import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";
import { getFilm, updateFilm } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { FilmDetail, FilmCreateDto, FilmUpdateDto } from "../types";
import FilmForm from "../components/FilmForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

export default function FilmEditPage() {
  const { id } = useParams<{ id: string }>();
  const filmId = Number(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [film, setFilm] = useState<FilmDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    getFilm(filmId)
      .then(setFilm)
      .catch((err) => setLoadError(getErrorMessage(err, "Film yüklenemedi.")))
      .finally(() => setLoading(false));
  }, [filmId]);

  const handleSubmit = async (dto: FilmCreateDto | FilmUpdateDto) => {
    if (!user) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await updateFilm(filmId, dto as FilmUpdateDto, user.id);
      navigate(`/films/${filmId}`);
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Film güncellenemedi."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (loadError) return <ErrorAlert message={loadError} />;
  if (!film) return null;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        className="fade-in-up"
        elevation={0}
        sx={{ p: 4, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <EditIcon sx={{ color: GOLD, fontSize: 30 }} />
          <Typography variant="h5">Filmi Düzenle</Typography>
        </Box>
        <FilmForm
          mode="edit"
          initialValues={film}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={submitError}
        />
      </Paper>
    </Container>
  );
}
