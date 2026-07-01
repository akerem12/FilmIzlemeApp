import { List, ListItem, ListItemText, Chip, Typography, Box } from "@mui/material";
import type { FilmReview } from "../types";

export default function ReviewList({ reviews }: { reviews: FilmReview[] }) {
  if (reviews.length === 0) {
    return <Typography color="text.secondary">Henüz yorum yapılmamış.</Typography>;
  }

  return (
    <List>
      {reviews.map((review) => (
        <ListItem key={review.id} alignItems="flex-start" divider>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  {review.username}
                </Typography>
                <Chip label={`${review.rating} / 10`} color="warning" size="small" />
              </Box>
            }
            secondary={
              <>
                {review.comment}
                <br />
                <Typography component="span" variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString("tr-TR")}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
