-- FILMS tablosu
CREATE TABLE Films (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    ReleaseYear INT,
    Genre NVARCHAR(100),
    Rate FLOAT
);

-- USERS tablosu
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255)
);

-- WATCHED tablosu
CREATE TABLE WatchedFilms (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT FOREIGN KEY REFERENCES Users(Id),
    FilmId INT FOREIGN KEY REFERENCES Films(Id),
    WatchedDate DATETIME DEFAULT GETDATE()
);

-- SEED VERİLER
INSERT INTO Films (Title, Description, ReleaseYear, Genre, Rate) VALUES
('The Shawshank Redemption', 'Hope can set you free.', 1994, 'Drama', 9.3),
('Inception', 'A mind-bending thriller.', 2010, 'Sci-Fi', 8.8),
('The Dark Knight', 'The rise of a legend.', 2008, 'Action', 9.0);

INSERT INTO Users (Username, Password, Email) VALUES
('john_doe', '123456', 'john@example.com'),
('jane_smith', 'abc123', 'jane@example.com');

INSERT INTO WatchedFilms (UserId, FilmId) VALUES
(1, 1),
(1, 2),
(2, 3);
