import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { getFilm, deleteFilm } from "../api/films";
import { getReviewsByFilm, addReview } from "../api/reviews";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api/watchlist";
import { getWatched, markWatched, unmarkWatched } from "../api/watched";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { FilmDetail, FilmReview } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function FilmDetailPage() {
  const { id } = useParams<{ id: string }>();
  const filmId = Number(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [film, setFilm] = useState<FilmDetail | null>(null);
  const [reviews, setReviews] = useState<FilmReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [inWatchlist, setInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadFilmAndReviews = useCallback(async () => {
    const [filmData, reviewsData] = await Promise.all([
      getFilm(filmId),
      getReviewsByFilm(filmId),
    ]);
    setFilm(filmData);
    setReviews(reviewsData);
  }, [filmId]);

  useEffect(() => {
    setLoading(true);
    loadFilmAndReviews()
      .catch((err) => setError(getErrorMessage(err, "Film yüklenemedi.")))
      .finally(() => setLoading(false));
  }, [loadFilmAndReviews]);

  useEffect(() => {
    if (!user) {
      setInWatchlist(false);
      setIsWatched(false);
      return;
    }
    Promise.all([getWatchlist(user.id), getWatched(user.id)]).then(([watchlist, watched]) => {
      setInWatchlist(watchlist.some((f) => f.filmId === filmId));
      setIsWatched(watched.some((f) => f.filmId === filmId));
    });
  }, [filmId, user]);

  const handleToggleWatchlist = async () => {
    if (!user) return;
    if (inWatchlist) {
      await removeFromWatchlist(user.id, filmId);
      setInWatchlist(false);
    } else {
      await addToWatchlist(user.id, filmId);
      setInWatchlist(true);
    }
  };

  const handleToggleWatched = async () => {
    if (!user) return;
    if (isWatched) {
      await unmarkWatched(user.id, filmId);
      setIsWatched(false);
    } else {
      await markWatched(user.id, filmId);
      setIsWatched(true);
    }
  };

  const handleReviewSubmit = async (comment: string, rating: number) => {
    if (!user) return;
    setReviewSubmitting(true);
    setReviewError(null);
    try {
      await addReview({ filmId, userId: user.id, comment, rating });
      await loadFilmAndReviews();
    } catch (err) {
      setReviewError(getErrorMessage(err, "Yorum eklenemedi."));
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDelete = async () => {
    await deleteFilm(filmId);
    navigate("/");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!film) return null;

  return (
    <Container sx={{ py: 3 }} maxWidth="md">
      <Typography variant="h4">{film.title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        {film.year} · {film.time} dk · Yönetmen: {film.directorName}
      </Typography>
      <Chip label={`${film.rate.toFixed(1)} / 10`} color="warning" sx={{ mb: 2 }} />
      <Typography sx={{ mb: 3 }}>{film.description}</Typography>

      {user && (
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button variant={inWatchlist ? "outlined" : "contained"} onClick={handleToggleWatchlist}>
            {inWatchlist ? "İzleme Listemden Çıkar" : "İzleme Listeme Ekle"}
          </Button>
          <Button variant={isWatched ? "outlined" : "contained"} onClick={handleToggleWatched}>
            {isWatched ? "İzlenmedi Olarak İşaretle" : "İzledim Olarak İşaretle"}
          </Button>
          <Button component={Link} to={`/films/${filmId}/edit`} variant="text">
            Düzenle
          </Button>
          <Button color="error" variant="text" onClick={() => setDeleteOpen(true)}>
            Sil
          </Button>
        </Stack>
      )}

      <Typography variant="h6" sx={{ mb: 1 }}>
        Yorumlar
      </Typography>
      <ReviewList reviews={reviews} />

      {user && (
        <ReviewForm onSubmit={handleReviewSubmit} submitting={reviewSubmitting} error={reviewError} />
      )}

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Bu filmi silmek istediğinize emin misiniz?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Vazgeç</Button>
          <Button color="error" onClick={handleDelete}>
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
