import { useState, type FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
  Paper,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { updateUser } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

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
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper
        className="fade-in-up"
        elevation={0}
        sx={{ p: 4, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 1.5,
              fontSize: 28,
              fontWeight: 800,
              bgcolor: GOLD,
              color: "#141414",
            }}
          >
            {user.username.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="h5">{user.username}</Typography>
          <Chip
            label={user.role === "Admin" ? "Admin" : "Üye"}
            size="small"
            sx={{
              mt: 1,
              backgroundColor: user.role === "Admin" ? "rgba(245,197,24,0.15)" : "rgba(255,255,255,0.08)",
              color: user.role === "Admin" ? GOLD : "text.secondary",
            }}
          />
        </Box>
        {error && <ErrorAlert message={error} />}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profil güncellendi.
          </Alert>
        )}
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            Güncelle
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
