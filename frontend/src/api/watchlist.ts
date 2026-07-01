import apiClient from "./client";
import type { WatchListFilm } from "../types";

export const getWatchlist = (userId: number) =>
  apiClient.get<WatchListFilm[]>(`/users/${userId}/watchlist`).then((r) => r.data);

export const addToWatchlist = (userId: number, filmId: number) =>
  apiClient.post(`/users/${userId}/watchlist/${filmId}`).then((r) => r.data);

export const removeFromWatchlist = (userId: number, filmId: number) =>
  apiClient.delete(`/users/${userId}/watchlist/${filmId}`).then((r) => r.data);
