import { useState, type FormEvent } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import type { FilmDetail, FilmCreateDto, FilmUpdateDto } from "../types";
import ErrorAlert from "./ErrorAlert";

interface FilmFormProps {
  mode: "create" | "edit";
  initialValues?: FilmDetail;
  onSubmit: (values: FilmCreateDto | FilmUpdateDto) => Promise<void>;
  submitting: boolean;
  error?: string | null;
}

export default function FilmForm({ mode, initialValues, onSubmit, submitting, error }: FilmFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [time, setTime] = useState(initialValues?.time ?? 0);
  const [year, setYear] = useState(initialValues?.year ?? new Date().getFullYear());
  const [directorId, setDirectorId] = useState(initialValues?.directorId ?? 0);
  const [directorName, setDirectorName] = useState(initialValues?.directorName ?? "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      const dto: FilmCreateDto = { title, description, time, year, directorId, directorName, rate: 0 };
      await onSubmit(dto);
    } else {
      const dto: FilmUpdateDto = { title, description, time, year, rate: initialValues?.rate ?? 0 };
      await onSubmit(dto);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <ErrorAlert message={error} />}
      <Stack spacing={2}>
        <TextField
          label="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />
        <TextField
          label="Süre (dk)"
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          required
          fullWidth
        />
        <TextField
          label="Yıl"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
          fullWidth
        />
        {mode === "create" && (
          <>
            <TextField
              label="Yönetmen Adı"
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Yönetmen Id"
              type="number"
              value={directorId}
              onChange={(e) => setDirectorId(Number(e.target.value))}
              required
              fullWidth
            />
          </>
        )}
        <Button type="submit" variant="contained" disabled={submitting}>
          {mode === "create" ? "Film Ekle" : "Güncelle"}
        </Button>
      </Stack>
    </Box>
  );
}
