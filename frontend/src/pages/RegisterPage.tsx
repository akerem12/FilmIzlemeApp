import { useState, type FormEvent } from "react";
import { Container, TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import ErrorAlert from "../components/ErrorAlert";

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
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Kayıt Ol
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
        <Button type="submit" variant="contained" disabled={submitting}>
          Kayıt Ol
        </Button>
      </Stack>
    </Container>
  );
}
