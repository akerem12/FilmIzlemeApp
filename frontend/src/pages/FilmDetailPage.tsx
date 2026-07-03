import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { posterGradient } from "../utils/posterGradient";
import { GOLD } from "../theme";

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
    if (!user) return;
    await deleteFilm(filmId, user.id);
    navigate("/");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!film) return null;

  return (
    <Box className="fade-in-up">
      {/* Backdrop başlık alanı */}
      <Box
        sx={{
          position: "relative",
          background: posterGradient(film.title),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11,15,25,0.35), rgba(11,15,25,0.92) 90%)",
          }}
        />
        <Container sx={{ position: "relative", py: { xs: 6, md: 9 } }}>
          <Typography
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(44px, 7vw, 80px)",
              letterSpacing: 2,
              lineHeight: 1,
              color: "#fff",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {film.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<StarIcon />}
              label={`${film.rate.toFixed(1)} / 10`}
              sx={{
                backgroundColor: "rgba(11,15,25,0.75)",
                color: GOLD,
                "& .MuiChip-icon": { color: GOLD },
                fontSize: 15,
              }}
            />
            <Chip
              icon={<CalendarMonthIcon />}
              label={film.year}
              sx={{ backgroundColor: "rgba(11,15,25,0.75)" }}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={`${film.time} dk`}
              sx={{ backgroundColor: "rgba(11,15,25,0.75)" }}
            />
            <Chip
              icon={<PersonIcon />}
              label={film.directorName}
              sx={{ backgroundColor: "rgba(11,15,25,0.75)" }}
            />
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 4 }} maxWidth="md">
        <Typography sx={{ mb: 3, fontSize: 17, color: "text.primary", lineHeight: 1.7 }}>
          {film.description}
        </Typography>

        {user && (
          <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
            <Button
              variant={inWatchlist ? "outlined" : "contained"}
              startIcon={inWatchlist ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleToggleWatchlist}
            >
              {inWatchlist ? "İzleme Listemden Çıkar" : "İzleme Listeme Ekle"}
            </Button>
            <Button
              variant={isWatched ? "outlined" : "contained"}
              color={isWatched ? "primary" : "secondary"}
              startIcon={isWatched ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={handleToggleWatched}
              sx={!isWatched ? { backgroundColor: "#2a3347", color: "#fff", "&:hover": { backgroundColor: "#3a4560" } } : undefined}
            >
              {isWatched ? "İzlenmedi Olarak İşaretle" : "İzledim Olarak İşaretle"}
            </Button>
            {user.role === "Admin" && (
              <>
                <Button
                  component={Link}
                  to={`/films/${filmId}/edit`}
                  variant="text"
                  startIcon={<EditIcon />}
                >
                  Düzenle
                </Button>
                <Button
                  color="error"
                  variant="text"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteOpen(true)}
                >
                  Sil
                </Button>
              </>
            )}
          </Stack>
        )}

        <Typography variant="h5" sx={{ mb: 2 }}>
          Yorumlar
          <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, fontSize: 18, ml: 1 }}>
            ({reviews.length})
          </Box>
        </Typography>
        <ReviewList reviews={reviews} />

        {user && (
          <ReviewForm
            onSubmit={handleReviewSubmit}
            submitting={reviewSubmitting}
            error={reviewError}
          />
        )}

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Bu filmi silmek istediğinize emin misiniz?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Vazgeç</Button>
            <Button color="error" variant="contained" onClick={handleDelete}>
              Sil
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
