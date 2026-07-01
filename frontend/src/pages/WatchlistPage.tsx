import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getWatchlist, removeFromWatchlist } from "../api/watchlist";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { WatchListFilm } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

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
    <Container sx={{ py: 3 }} maxWidth="md">
      <Typography variant="h5" sx={{ mb: 2 }}>
        İzleme Listem
      </Typography>
      {error && <ErrorAlert message={error} />}
      {items.length === 0 && !error && (
        <Typography color="text.secondary">İzleme listeniz boş.</Typography>
      )}
      <List>
        {items.map((item) => (
          <ListItem
            key={item.filmId}
            divider
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <Button component={Link} to={`/films/${item.filmId}`} size="small">
                  Görüntüle
                </Button>
                <Button color="error" size="small" onClick={() => handleRemove(item.filmId)}>
                  Kaldır
                </Button>
              </Stack>
            }
          >
            <ListItemText
              primary={item.title}
              secondary={`${item.year} · ${item.time} dk · Eklenme: ${new Date(
                item.addedAt
              ).toLocaleDateString("tr-TR")}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
