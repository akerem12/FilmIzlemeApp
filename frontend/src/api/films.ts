import apiClient from "./client";
import type { FilmListItem, FilmDetail } from "../types";

export const getFilms = () => apiClient.get<FilmListItem[]>("/Film").then((r) => r.data);

export const getFilm = (id: number) => apiClient.get<FilmDetail>(`/Film/${id}`).then((r) => r.data);

export const searchFilms = (title: string) =>
  apiClient.get<FilmListItem[]>("/Film/search", { params: { title } }).then((r) => r.data);
