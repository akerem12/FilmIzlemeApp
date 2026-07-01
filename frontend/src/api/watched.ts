import apiClient from "./client";
import type { WatchedFilm } from "../types";

export const getWatched = (userId: number) =>
  apiClient.get<WatchedFilm[]>(`/users/${userId}/watched`).then((r) => r.data);

export const markWatched = (userId: number, filmId: number) =>
  apiClient.post(`/users/${userId}/watched/${filmId}`).then((r) => r.data);

export const unmarkWatched = (userId: number, filmId: number) =>
  apiClient.delete(`/users/${userId}/watched/${filmId}`).then((r) => r.data);
