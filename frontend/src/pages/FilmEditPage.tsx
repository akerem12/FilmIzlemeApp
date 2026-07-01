import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getFilm, updateFilm } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import type { FilmDetail, FilmCreateDto, FilmUpdateDto } from "../types";
import FilmForm from "../components/FilmForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

export default function FilmEditPage() {
  const { id } = useParams<{ id: string }>();
  const filmId = Number(id);
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
    setSubmitting(true);
    setSubmitError(null);
    try {
      await updateFilm(filmId, dto as FilmUpdateDto);
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
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Filmi Düzenle
      </Typography>
      <FilmForm
        mode="edit"
        initialValues={film}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={submitError}
      />
    </Container>
  );
}
