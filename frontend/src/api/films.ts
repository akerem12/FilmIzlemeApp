import apiClient from "./client";
import type { FilmListItem, FilmDetail, FilmCreateDto, FilmUpdateDto } from "../types";

export const getFilms = () => apiClient.get<FilmListItem[]>("/Film").then((r) => r.data);

export const getFilm = (id: number) => apiClient.get<FilmDetail>(`/Film/${id}`).then((r) => r.data);

export const createFilm = (dto: FilmCreateDto) =>
  apiClient.post("/Film", dto).then((r) => r.data);

export const updateFilm = (id: number, dto: FilmUpdateDto) =>
  apiClient.put(`/Film/${id}`, dto).then((r) => r.data);

export const deleteFilm = (id: number) => apiClient.delete(`/Film/${id}`).then((r) => r.data);
