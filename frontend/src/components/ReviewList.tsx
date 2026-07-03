import { Box, Typography, Avatar, Chip, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { FilmReview } from "../types";
import { GOLD } from "../theme";

const AVATAR_COLORS = ["#e57373", "#64b5f6", "#81c784", "#ba68c8", "#ffb74d", "#4dd0e1"];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ReviewList({ reviews }: { reviews: FilmReview[] }) {
  if (reviews.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Henüz yorum yapılmamış. İlk yorumu sen yap!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
      {reviews.map((review) => (
        <Paper
          key={review.id}
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: 15,
                fontWeight: 700,
                bgcolor: avatarColor(review.username),
                color: "#0b0f19",
              }}
            >
              {review.username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {review.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.createdAt).toLocaleDateString("tr-TR")}
              </Typography>
            </Box>
            <Chip
              icon={<StarIcon sx={{ fontSize: 15 }} />}
              label={`${review.rating}/10`}
              size="small"
              sx={{
                backgroundColor: "rgba(245,197,24,0.12)",
                color: GOLD,
                "& .MuiChip-icon": { color: GOLD },
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.6 }}>
            {review.comment}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
