# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A film-tracking app ("Film İzleme Uygulaması"): users search films, maintain a watchlist and watched history, and leave reviews. Two parts in one repo:

- `backend/` — ASP.NET Core (.NET 8) Web API, layered architecture, EF Core + SQL Server.
- `frontend/` — React 19 + TypeScript + Vite, MUI components, dark cinema theme.

## Commands

### Backend (run from `backend/`)
```
dotnet run --project WebAPI --launch-profile http   # runs API on http://localhost:5237
dotnet build                                          # build whole solution
dotnet ef database update --project DataAccess --startup-project WebAPI   # apply migrations
dotnet ef migrations add <Name> --project DataAccess --startup-project WebAPI  # new migration
```
`dotnet-ef` is a local tool pinned in `.config/dotnet-tools.json`; run `dotnet tool restore` once if `dotnet ef` isn't found. Swagger UI is available at the API root in Development.

Film data comes from TMDb, which requires an API key set via local user-secrets (never committed): `dotnet user-secrets set "Tmdb:ApiKey" "<key>"` from `backend/WebAPI`. Without it, `/api/Film*` endpoints return 401 from TMDb but the rest of the app (auth, watchlist, watched, reviews) works fine.

### Frontend (run from `frontend/`)
```
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run preview
```
The frontend reads the API base URL from `VITE_API_URL` (see `.env.example`; defaults to `http://localhost:5237/api`).

There are no automated test suites in either project currently.

## Architecture

### Backend: layered/N-tier, no ORM leakage across layers
- **Entities** (`backend/Entities/Concrete`) — plain POCOs: `Film`, `User`, `Review`, `WatchedFilm`, `WatchList`. `Film` is *not* persisted (see below) — it's just the shape TMDb responses get mapped into.
- **DataAccess** (`backend/DataAccess`) — `AppDbContext`, `Abstract/I*Repository` interfaces, and `Concrete/EntityFrameWork/Ef*Repository` implementations (EF Core against SQL Server) for `User`, `Review`, `WatchedFilm`, `WatchList`. Migrations live in `DataAccess/Migrations`.
- **Business** (`backend/Business`) — `Abstract/I*Service` interfaces and `Concrete/*Manager` implementations. Managers call repositories directly; there's no separate validation layer.
- **WebAPI** (`backend/WebAPI`) — `Controllers/*` (thin, call services directly) and `DTOs/*` for request bodies. All wiring (DbContext, DI registrations for every repository/service pair, CORS, Swagger) happens in `Program.cs`.

New features generally require touching all four projects in order: Entity → Repository (Abstract + EF impl) → Service (Abstract + Manager) → Controller/DTO → register both new types in `Program.cs`.

### Films come from TMDb, not the database (important, non-obvious)
There is no local `Films` table. `IFilmService`/`TmdbFilmManager` (`backend/Business/Concrete/TmdbFilmManager.cs`) is a typed `HttpClient` that calls the TMDb API (`/movie/popular`, `/search/movie`, `/movie/{id}`) and maps the JSON into the `Film` POCO on every request — nothing is cached or written to SQL Server. It's registered as `builder.Services.AddHttpClient<IFilmService, TmdbFilmManager>()` in `Program.cs`. `WatchedFilm`, `WatchList`, and `Review` still live in the DB, but only store a bare `FilmId` int (TMDb's movie id) with no FK to a local films table — there is nothing to join against, so any endpoint that needs a film's title/poster/rating calls `IFilmService` (or, on the frontend, `getFilm(id)`) separately. Admin users can no longer create/edit/delete films (TMDb is the only source of film data); the `FilmController` has no mutating endpoints.

### Auth model (important, non-obvious)
There is no cookie/JWT/session auth. `POST /api/User/login` just compares plaintext passwords and returns the user object (including `Role`, `"User"` or `"Admin"`). The frontend stores this user object in `localStorage` (`AuthContext.tsx`) and passes `userId` as a query-string parameter on every mutating request. Admin-gated backend endpoints (currently just user role update) re-fetch that `userId` server-side and check `user.Role == "Admin"` inline in the controller — there's no middleware/attribute-based authorization. When adding new protected endpoints, follow this same `[FromQuery] int userId` + inline role-check pattern rather than introducing ASP.NET `[Authorize]`, unless asked to change the auth model itself.

On the frontend, `ProtectedRoute`/`AdminRoute` (`frontend/src/components/`) gate routes client-side off the same `AuthContext` user object — this is a UX guard, not a security boundary; the real check is always server-side in the controller.

### Nested resource controllers
Watchlist and watched-history are modeled as sub-resources of a user rather than their own top-level controllers: `WatchListController` routes at `api/users/{userId}/watchlist`, `UserWatchedController` at `api/users/{userId}/watched`. Follow this nesting convention for similar per-user resources.

### Frontend structure
- `src/api/*.ts` — one file per backend resource (`films.ts`, `users.ts`, `reviews.ts`, `watched.ts`, `watchlist.ts`), all built on the shared `axios` instance in `src/api/client.ts`.
- `src/context/AuthContext.tsx` — the only client-side auth state, backed by `localStorage`.
- `src/pages/*` — route-level components wired up in `App.tsx`; `src/components/*` holds shared UI (forms, cards, route guards).
- `theme.ts` — MUI theme (dark cinema look); prefer extending this over inline styles.
- CORS on the backend (`Program.cs`) only allows `http://localhost:5173` — update `FrontendPolicy` if the frontend origin changes.
