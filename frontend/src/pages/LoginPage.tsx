import { useState, type FormEvent } from "react";
import { Container, TextField, Button, Stack, Typography, Paper, Box } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const user = await loginUser({ username, password });
      login(user);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Giriş yapılamadı."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper
        className="fade-in-up"
        elevation={0}
        sx={{ p: 4, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LocalMoviesIcon sx={{ color: GOLD, fontSize: 42, mb: 1 }} />
          <Typography variant="h5">Tekrar Hoş Geldin</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Hesabına giriş yap ve kaldığın yerden devam et.
          </Typography>
        </Box>
        {error && <ErrorAlert message={error} />}
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            Giriş Yap
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          Hesabın yok mu?{" "}
          <Box
            component={Link}
            to="/register"
            sx={{ color: GOLD, textDecoration: "none", fontWeight: 600 }}
          >
            Kayıt ol
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
}
