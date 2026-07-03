import { useState, type FormEvent } from "react";
import { Box, TextField, Button, Slider, Typography, Paper } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ErrorAlert from "./ErrorAlert";
import { GOLD } from "../theme";

interface ReviewFormProps {
  onSubmit: (comment: string, rating: number) => Promise<void>;
  submitting: boolean;
  error?: string | null;
}

export default function ReviewForm({ onSubmit, submitting, error }: ReviewFormProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(8);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(comment, rating);
    setComment("");
    setRating(8);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        mt: 3,
        p: 3,
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      {error && <ErrorAlert message={error} />}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <RateReviewIcon sx={{ color: GOLD }} />
        <Typography variant="h6">Yorum Yap</Typography>
      </Box>
      <Box sx={{ maxWidth: 340, mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Puanın: <Box component="span" sx={{ color: GOLD, fontWeight: 700 }}>{rating} / 10</Box>
        </Typography>
        <Slider
          value={rating}
          onChange={(_, value) => setRating(value as number)}
          min={1}
          max={10}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>
      <TextField
        label="Yorumunuz"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        minRows={2}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={submitting}>
        Gönder
      </Button>
    </Paper>
  );
}
