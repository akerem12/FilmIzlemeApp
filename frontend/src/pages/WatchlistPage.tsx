import { useEffect, useState } from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { getWatchlist, removeFromWatchlist } from "../api/watchlist";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { WatchListFilm } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import FilmListRow from "../components/FilmListRow";
import { GOLD } from "../theme";

export default function WatchlistPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<WatchListFilm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getWatchlist(user.id)
      .then(setItems)
      .catch((err) => setError(getErrorMessage(err, "İzleme listesi yüklenemedi.")))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (filmId: number) => {
    if (!user) return;
    await removeFromWatchlist(user.id, filmId);
    setItems((prev) => prev.filter((f) => f.filmId !== filmId));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container sx={{ py: 5 }} maxWidth="md" className="fade-in-up">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <BookmarkIcon sx={{ color: GOLD, fontSize: 32 }} />
        <Typography variant="h4">İzleme Listem</Typography>
      </Box>
      {error && <ErrorAlert message={error} />}
      {items.length === 0 && !error && (
        <Typography color="text.secondary">
          İzleme listen boş. Ana sayfadan beğendiğin filmleri ekle!
        </Typography>
      )}
      <Stack spacing={1.5}>
        {items.map((item) => (
          <FilmListRow
            key={item.filmId}
            filmId={item.filmId}
            dateLabel={`Eklenme: ${new Date(item.addedAt).toLocaleDateString("tr-TR")}`}
            onRemove={() => handleRemove(item.filmId)}
          />
        ))}
      </Stack>
    </Container>
  );
}
