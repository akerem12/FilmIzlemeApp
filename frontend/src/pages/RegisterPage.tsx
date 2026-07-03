import { useState, type FormEvent } from "react";
import { Container, TextField, Button, Stack, Typography, Paper, Box } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError(getErrorMessage(err, "Kayıt oluşturulamadı."));
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
          <MovieFilterIcon sx={{ color: GOLD, fontSize: 42, mb: 1 }} />
          <Typography variant="h5">Aramıza Katıl</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Ücretsiz hesap oluştur, film listeni yönetmeye başla.
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
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Kayıt Ol
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
          Zaten hesabın var mı?{" "}
          <Box
            component={Link}
            to="/login"
            sx={{ color: GOLD, textDecoration: "none", fontWeight: 600 }}
          >
            Giriş yap
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
}
