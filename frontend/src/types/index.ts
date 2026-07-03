// ---- Films ----
export interface FilmListItem {
  id: number;
  title: string;
  posterUrl: string | null;
  year: number;
  rate: number;
}

export interface FilmDetail {
  id: number;
  title: string;
  description: string;
  posterUrl: string | null;
  time: number;
  year: number;
  rate: number;
}

// ---- Reviews ----
export interface ReviewCreateDto {
  filmId: number;
  userId: number;
  comment: string;
  rating: number;
}

export interface FilmReview {
  id: number;
  comment: string;
  rating: number;
  createdAt: string;
  userId: number;
  username: string;
}

export interface UserReview {
  id: number;
  comment: string;
  rating: number;
  createdAt: string;
  filmId: number;
}

// ---- Users ----
export interface UserRegisterDto {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserUpdateDto {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserRoleUpdateDto {
  role: string;
}

// ---- Watched / Watchlist ----
export interface WatchedFilm {
  filmId: number;
  watchedAt: string;
}

export interface WatchListFilm {
  filmId: number;
  addedAt: string;
}
