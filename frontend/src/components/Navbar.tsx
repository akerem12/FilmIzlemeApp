import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GOLD } from "../theme";

function NavButton({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: active ? GOLD : "text.secondary",
        fontWeight: active ? 700 : 500,
        "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.05)" },
      }}
    >
      {children}
    </Button>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(11, 15, 25, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none",
      }}
    >
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          <LocalMoviesIcon sx={{ color: GOLD, fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26,
              letterSpacing: 1.5,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            FILM<Box component="span" sx={{ color: GOLD }}>IZLEME</Box>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <NavButton to="/">Ana Sayfa</NavButton>
          {user ? (
            <>
              <NavButton to="/watchlist">İzleme Listem</NavButton>
              <NavButton to="/watched">İzlediklerim</NavButton>
              {user.role === "Admin" && (
                <NavButton to="/admin/users">Kullanıcılar</NavButton>
              )}
              <NavButton to="/profile">{user.username}</NavButton>
              <Button
                onClick={handleLogout}
                variant="outlined"
                size="small"
                sx={{
                  ml: 1,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "text.secondary",
                  "&:hover": { borderColor: GOLD, color: GOLD },
                }}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <NavButton to="/login">Giriş Yap</NavButton>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{ ml: 1 }}
              >
                Kayıt Ol
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
