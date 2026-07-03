import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Skeleton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { getFilm } from "../api/films";
import type { FilmDetail } from "../types";
import { posterGradient } from "../utils/posterGradient";

interface FilmListRowProps {
  filmId: number;
  dateLabel: string;
  onRemove: () => void;
}

export default function FilmListRow({ filmId, dateLabel, onRemove }: FilmListRowProps) {
  const [film, setFilm] = useState<FilmDetail | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFilm(filmId).then((data) => {
      if (!cancelled) setFilm(data);
    });
    return () => {
      cancelled = true;
    };
  }, [filmId]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(255,255,255,0.02)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": { borderColor: "rgba(245,197,24,0.3)", transform: "translateX(4px)" },
      }}
    >
      {!film ? (
        <Skeleton variant="rounded" width={72} height={48} sx={{ flexShrink: 0 }} />
      ) : (
        <Box
          component={Link}
          to={`/films/${filmId}`}
          sx={{
            width: 72,
            height: 48,
            borderRadius: 2,
            overflow: "hidden",
            background: film.posterUrl ? undefined : posterGradient(film.title),
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          {film.posterUrl ? (
            <Box
              component="img"
              src={film.posterUrl}
              alt={film.title}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: 1,
              }}
            >
              {film.title.slice(0, 2).toUpperCase()}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {!film ? (
          <>
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </>
        ) : (
          <>
            <Typography
              component={Link}
              to={`/films/${filmId}`}
              noWrap
              sx={{ fontWeight: 700, color: "text.primary", textDecoration: "none", display: "block", "&:hover": { color: "primary.main" } }}
            >
              {film.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {film.year || "—"} · {dateLabel}
            </Typography>
          </>
        )}
      </Box>

      <Button
        color="error"
        size="small"
        startIcon={<DeleteOutlineIcon />}
        onClick={onRemove}
        sx={{ flexShrink: 0 }}
      >
        Kaldır
      </Button>
    </Paper>
  );
}
