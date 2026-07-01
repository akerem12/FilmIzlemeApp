import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          FilmIzlemeApp
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Ana Sayfa
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/watchlist">
                İzleme Listem
              </Button>
              <Button color="inherit" component={Link} to="/watched">
                İzlediklerim
              </Button>
              {user.role === "Admin" && (
                <>
                  <Button color="inherit" component={Link} to="/films/new">
                    Film Ekle
                  </Button>
                  <Button color="inherit" component={Link} to="/admin/users">
                    Kullanıcılar
                  </Button>
                </>
              )}
              <Button color="inherit" component={Link} to="/profile">
                {user.username}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Giriş Yap
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Kayıt Ol
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
