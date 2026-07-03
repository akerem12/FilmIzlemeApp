using Business.Abstract;
using Entities.Concrete;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Web;

namespace Business.Concrete
{
    public class TmdbFilmManager : IFilmService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;
        private readonly string _imageBaseUrl;

        public TmdbFilmManager(HttpClient http, IConfiguration configuration)
        {
            _http = http;
            var baseUrl = configuration["Tmdb:BaseUrl"] ?? "https://api.themoviedb.org/3";
            _http.BaseAddress = new Uri(baseUrl.TrimEnd('/') + "/");
            _apiKey = configuration["Tmdb:ApiKey"] ?? "";
            _imageBaseUrl = configuration["Tmdb:ImageBaseUrl"] ?? "https://image.tmdb.org/t/p/w500";
        }

        public async Task<List<Film>> GetPopularAsync()
        {
            var response = await _http.GetFromJsonAsync<TmdbListResponse>(
                $"movie/popular?api_key={_apiKey}&language=tr-TR&page=1");

            return response?.Results?.Select(MapListItem).ToList() ?? new List<Film>();
        }

        public async Task<List<Film>> SearchAsync(string title)
        {
            var query = HttpUtility.UrlEncode(title);
            var response = await _http.GetFromJsonAsync<TmdbListResponse>(
                $"search/movie?api_key={_apiKey}&language=tr-TR&query={query}");

            return response?.Results?.Select(MapListItem).ToList() ?? new List<Film>();
        }

        public async Task<Film?> GetByIdAsync(int id)
        {
            var movie = await _http.GetFromJsonAsync<TmdbMovie>(
                $"movie/{id}?api_key={_apiKey}&language=tr-TR");

            if (movie == null) return null;

            return new Film
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Overview,
                PosterUrl = BuildPosterUrl(movie.PosterPath),
                year = ParseYear(movie.ReleaseDate),
                time = movie.Runtime ?? 0,
                rate = movie.VoteAverage,
            };
        }

        private Film MapListItem(TmdbMovie movie) => new Film
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Overview,
            PosterUrl = BuildPosterUrl(movie.PosterPath),
            year = ParseYear(movie.ReleaseDate),
            time = 0,
            rate = movie.VoteAverage,
        };

        private string? BuildPosterUrl(string? posterPath) =>
            string.IsNullOrEmpty(posterPath) ? null : $"{_imageBaseUrl}{posterPath}";

        private static int ParseYear(string? releaseDate) =>
            !string.IsNullOrEmpty(releaseDate) && releaseDate.Length >= 4 && int.TryParse(releaseDate.AsSpan(0, 4), out var year)
                ? year
                : 0;

        private class TmdbListResponse
        {
            [JsonPropertyName("results")]
            public List<TmdbMovie> Results { get; set; } = new();
        }

        private class TmdbMovie
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("title")]
            public string Title { get; set; } = "";

            [JsonPropertyName("overview")]
            public string Overview { get; set; } = "";

            [JsonPropertyName("poster_path")]
            public string? PosterPath { get; set; }

            [JsonPropertyName("release_date")]
            public string? ReleaseDate { get; set; }

            [JsonPropertyName("vote_average")]
            public double VoteAverage { get; set; }

            [JsonPropertyName("runtime")]
            public int? Runtime { get; set; }
        }
    }
}
