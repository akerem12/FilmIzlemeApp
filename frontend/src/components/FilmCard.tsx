import { Card, CardActionArea, Typography, Chip, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import type { FilmListItem } from "../types";
import { posterGradient } from "../utils/posterGradient";
import { GOLD } from "../theme";

export default function FilmCard({ film }: { film: FilmListItem }) {
  return (
    <Card
      className="fade-in-up"
      sx={{
        height: "100%",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          borderColor: "rgba(245,197,24,0.35)",
        },
      }}
    >
      <CardActionArea component={Link} to={`/films/${film.id}`} sx={{ height: "100%" }}>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "2 / 3",
            background: film.posterUrl ? "#0b0f19" : posterGradient(film.title),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            p: film.posterUrl ? 0 : 2,
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
            <>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(11,15,25,0.55), transparent 55%)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(26px, 4vw, 40px)",
                  letterSpacing: 2,
                  color: "rgba(255,255,255,0.95)",
                  textAlign: "center",
                  textShadow: "0 2px 12px rgba(0,0,0,0.45)",
                  lineHeight: 1.05,
                  zIndex: 1,
                }}
              >
                {film.title}
              </Typography>
            </>
          )}
          <Chip
            icon={<StarIcon sx={{ fontSize: 16 }} />}
            label={film.rate.toFixed(1)}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(11,15,25,0.85)",
              color: GOLD,
              "& .MuiChip-icon": { color: GOLD },
              backdropFilter: "blur(4px)",
              zIndex: 1,
            }}
          />
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
            {film.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {film.year || "—"}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
