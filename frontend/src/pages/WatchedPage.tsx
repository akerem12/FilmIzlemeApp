import { useEffect, useState } from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getWatched, unmarkWatched } from "../api/watched";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { WatchedFilm } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import FilmListRow from "../components/FilmListRow";
import { GOLD } from "../theme";

export default function WatchedPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<WatchedFilm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getWatched(user.id)
      .then(setItems)
      .catch((err) => setError(getErrorMessage(err, "İzlenenler listesi yüklenemedi.")))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (filmId: number) => {
    if (!user) return;
    await unmarkWatched(user.id, filmId);
    setItems((prev) => prev.filter((f) => f.filmId !== filmId));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container sx={{ py: 5 }} maxWidth="md" className="fade-in-up">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <VisibilityIcon sx={{ color: GOLD, fontSize: 32 }} />
        <Typography variant="h4">İzlediklerim</Typography>
      </Box>
      {error && <ErrorAlert message={error} />}
      {items.length === 0 && !error && (
        <Typography color="text.secondary">
          Henüz izlediğin film yok. İzlediğin filmleri işaretleyerek burada takip et!
        </Typography>
      )}
      <Stack spacing={1.5}>
        {items.map((item) => (
          <FilmListRow
            key={item.filmId}
            filmId={item.filmId}
            dateLabel={`İzlenme: ${new Date(item.watchedAt).toLocaleDateString("tr-TR")}`}
            onRemove={() => handleRemove(item.filmId)}
          />
        ))}
      </Stack>
    </Container>
  );
}
