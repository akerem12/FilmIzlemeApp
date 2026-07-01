import apiClient from "./client";
import type { FilmListItem, FilmDetail, FilmCreateDto, FilmUpdateDto } from "../types";

export const getFilms = () => apiClient.get<FilmListItem[]>("/Film").then((r) => r.data);

export const getFilm = (id: number) => apiClient.get<FilmDetail>(`/Film/${id}`).then((r) => r.data);

export const createFilm = (dto: FilmCreateDto, adminId: number) =>
  apiClient.post("/Film", dto, { params: { userId: adminId } }).then((r) => r.data);

export const updateFilm = (id: number, dto: FilmUpdateDto, adminId: number) =>
  apiClient.put(`/Film/${id}`, dto, { params: { userId: adminId } }).then((r) => r.data);

export const deleteFilm = (id: number, adminId: number) =>
  apiClient.delete(`/Film/${id}`, { params: { userId: adminId } }).then((r) => r.data);
