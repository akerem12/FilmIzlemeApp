# 🎬 Film İzleme Uygulaması (ASP.NET Core Web API)

Bu proje, kullanıcıların film arayabileceği, izlemek istedikleri filmleri ekleyebileceği ve izleme geçmişlerini takip edebileceği bir RESTful Web API uygulamasıdır.

---

## 📌 Proje Özeti

- Film listeleme ve detay görüntüleme
- Kullanıcı kayıt/giriş
- Kullanıcı profili güncelleme
- İzleme geçmişi yönetimi
- Katmanlı mimari yapısı
- Swagger ile test edilebilir REST API

---

## 🛠 Kullanılan Teknolojiler

- **.NET 8**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQL Server**
- **Swagger**
- **Katmanlı Mimari (Entity, DataAccess, Business, WebAPI)**

---



##  API Endpoint Listesi

### Filmler
- `GET /api/Film`
- `GET /api/Film/{id}`
- `POST /api/Film`
- `PUT /api/Film/{id}`
- `DELETE /api/Film/{id}`
- `GET /api/Film/search`

### Kullanıcılar
- `POST /api/User`
- `POST /api/User/login`
- `GET /api/User/{id}`
- `GET /api/User`
- `PUT /api/User/{id}`

### İzleme Geçmişi
- `GET /api/users/{userId}/watched`
- `POST /api/users/{userId}/watched/{filmId}`
- `DELETE /api/users/{userId}/watched/{filmId}`

### İzleme Listesi
- `GET /api/users/{userId}/watchlist`
- `POST /api/users/{userId}/watchlist/{filmId}`
- `DELETE /api/users/{userId}/watchlist/{filmId}`

### Yorumlar
- `POST /api/Review`
- `GET /api/Review/film/{filmId}`
- `GET /api/Review/user/{userId}`
---

## 📄 Lisans

MIT License
