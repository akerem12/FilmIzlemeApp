import { useEffect, useState } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { getFilms } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import type { FilmListItem } from "../types";
import FilmCard from "../components/FilmCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

export default function HomePage() {
  const [films, setFilms] = useState<FilmListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getFilms()
      .then(setFilms)
      .catch((err) => setError(getErrorMessage(err, "Filmler yüklenemedi.")))
      .finally(() => setLoading(false));
  }, []);

  const visibleFilms = films.filter((f) =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ py: 3 }}>
      <TextField
        label="Film ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      {!loading && !error && visibleFilms.length === 0 && (
        <Typography color="text.secondary">Film bulunamadı.</Typography>
      )}
      <Grid container spacing={2}>
        {visibleFilms.map((film) => (
          <Grid key={film.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <FilmCard film={film} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
