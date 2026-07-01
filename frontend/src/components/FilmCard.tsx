import { Card, CardActionArea, CardContent, Typography, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";
import type { FilmListItem } from "../types";

export default function FilmCard({ film }: { film: FilmListItem }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/films/${film.id}`}>
        <CardContent>
          <Typography variant="h6" noWrap>
            {film.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {film.year} · {film.time} dk
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Yönetmen: {film.directorName}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip label={`${film.rate.toFixed(1)} / 10`} color="warning" size="small" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
