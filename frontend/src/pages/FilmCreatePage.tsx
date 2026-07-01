import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createFilm } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { FilmCreateDto, FilmUpdateDto } from "../types";
import FilmForm from "../components/FilmForm";

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
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Yeni Film Ekle
      </Typography>
      <FilmForm mode="create" onSubmit={handleSubmit} submitting={submitting} error={error} />
    </Container>
  );
}
