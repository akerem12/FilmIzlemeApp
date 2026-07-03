import { Box, Typography, Button, Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { posterGradient } from "../utils/posterGradient";

interface FilmListRowProps {
  filmId: number;
  title: string;
  year: number;
  time: number;
  dateLabel: string;
  onRemove: () => void;
}

export default function FilmListRow({ filmId, title, year, time, dateLabel, onRemove }: FilmListRowProps) {
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
      {/* Mini gradyan poster */}
      <Box
        component={Link}
        to={`/films/${filmId}`}
        sx={{
          width: 72,
          height: 48,
          borderRadius: 2,
          background: posterGradient(title),
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 1,
          }}
        >
          {title.slice(0, 2).toUpperCase()}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          component={Link}
          to={`/films/${filmId}`}
          noWrap
          sx={{ fontWeight: 700, color: "text.primary", textDecoration: "none", display: "block", "&:hover": { color: "primary.main" } }}
        >
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {year} · {time} dk · {dateLabel}
        </Typography>
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
