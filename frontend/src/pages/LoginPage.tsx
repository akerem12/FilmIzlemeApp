import { useState, type FormEvent } from "react";
import { Container, TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert";

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
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Giriş Yap
      </Typography>
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
        <Button type="submit" variant="contained" disabled={submitting}>
          Giriş Yap
        </Button>
      </Stack>
    </Container>
  );
}
