import apiClient from "./client";
import type { ReviewCreateDto, FilmReview, UserReview } from "../types";

export const addReview = (dto: ReviewCreateDto) =>
  apiClient.post("/Review", dto).then((r) => r.data);

export const getReviewsByFilm = (filmId: number) =>
  apiClient.get<FilmReview[]>(`/Review/film/${filmId}`).then((r) => r.data);

export const getReviewsByUser = (userId: number) =>
  apiClient.get<UserReview[]>(`/Review/user/${userId}`).then((r) => r.data);
