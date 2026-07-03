import { useEffect, useRef, useState } from "react";
import { Container, TextField, Grid, Typography, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getFilms, searchFilms } from "../api/films";
import { getErrorMessage } from "../api/errorMessage";
import type { FilmListItem } from "../types";
import FilmCard from "../components/FilmCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

export default function HomePage() {
  const [films, setFilms] = useState<FilmListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    getFilms()
      .then(setFilms)
      .catch((err) => setError(getErrorMessage(err, "Filmler yüklenemedi.")))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    const term = searchTerm.trim();

    debounceRef.current = setTimeout(() => {
      setLoading(true);
      const request = term ? searchFilms(term) : getFilms();
      request
        .then(setFilms)
        .catch((err) => setError(getErrorMessage(err, "Filmler yüklenemedi.")))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  return (
    <Container sx={{ py: 5 }}>
      {/* Hero */}
      <Box className="fade-in-up" sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 64px)",
            letterSpacing: 3,
            lineHeight: 1,
            color: "#fff",
          }}
        >
          FİLM <Box component="span" sx={{ color: GOLD }}>KEŞFET</Box>
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          İzle, puanla, listene ekle — hepsi tek yerde.
        </Typography>
        <TextField
          placeholder="Film ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 560 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      {!loading && !error && films.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: "center" }}>
          Film bulunamadı.
        </Typography>
      )}
      {!loading && !error && (
        <Grid container spacing={3}>
          {films.map((film) => (
            <Grid key={film.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <FilmCard film={film} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
