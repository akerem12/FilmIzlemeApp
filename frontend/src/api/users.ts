import apiClient from "./client";
import type { UserRegisterDto, UserLoginDto, UserUpdateDto, AuthUser } from "../types";

export const registerUser = (dto: UserRegisterDto) =>
  apiClient.post("/User", dto).then((r) => r.data);

export const loginUser = (dto: UserLoginDto) =>
  apiClient.post<AuthUser>("/User/login", dto).then((r) => r.data);

export const getUser = (id: number) => apiClient.get<AuthUser>(`/User/${id}`).then((r) => r.data);

export const getUsers = () => apiClient.get<AuthUser[]>("/User").then((r) => r.data);

export const updateUser = (id: number, dto: UserUpdateDto) =>
  apiClient.put(`/User/${id}`, dto).then((r) => r.data);
