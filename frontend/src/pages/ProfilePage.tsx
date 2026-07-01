import { useState, type FormEvent } from "react";
import { Container, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { updateUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert";

export default function ProfilePage() {
  const { user, updateUserInfo } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await updateUser(user.id, { email, password });
      updateUserInfo({ email });
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err, "Profil güncellenemedi."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Profilim
      </Typography>
      {error && <ErrorAlert message={error} />}
      {success && <Alert severity="success" sx={{ my: 2 }}>Profil güncellendi.</Alert>}
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField label="Kullanıcı Adı" value={user.username} disabled />
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
          helperText="Güncellemek için mevcut veya yeni şifrenizi girin."
        />
        <Button type="submit" variant="contained" disabled={submitting}>
          Güncelle
        </Button>
      </Stack>
    </Container>
  );
}
