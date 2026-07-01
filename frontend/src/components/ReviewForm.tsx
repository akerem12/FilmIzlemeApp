import { useState, type FormEvent } from "react";
import { Box, TextField, Button, Slider, Typography } from "@mui/material";
import ErrorAlert from "./ErrorAlert";

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <ErrorAlert message={error} />}
      <Typography variant="subtitle1">Yorum Yap</Typography>
      <Box sx={{ maxWidth: 300, my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Puan: {rating} / 10
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
      <Button type="submit" variant="contained" sx={{ mt: 1 }} disabled={submitting}>
        Gönder
      </Button>
    </Box>
  );
}
