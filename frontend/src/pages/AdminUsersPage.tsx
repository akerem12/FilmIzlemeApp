import { useEffect, useState } from "react";
import { Container, Typography, Button, Chip, Box, Paper, Avatar, Stack } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { getUsers, updateUserRole } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { AuthUser } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { GOLD } from "../theme";

const AVATAR_COLORS = ["#e57373", "#64b5f6", "#81c784", "#ba68c8", "#ffb74d", "#4dd0e1"];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(getErrorMessage(err, "Kullanıcılar yüklenemedi.")))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleRole = async (target: AuthUser) => {
    if (!currentAdmin) return;
    const newRole = target.role === "Admin" ? "User" : "Admin";
    try {
      await updateUserRole(currentAdmin.id, target.id, newRole);
      setUsers((prev) => prev.map((u) => (u.id === target.id ? { ...u, role: newRole } : u)));
    } catch (err) {
      setError(getErrorMessage(err, "Rol güncellenemedi."));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container sx={{ py: 5 }} maxWidth="md" className="fade-in-up">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <AdminPanelSettingsIcon sx={{ color: GOLD, fontSize: 32 }} />
        <Typography variant="h4">Kullanıcılar</Typography>
      </Box>
      {error && <ErrorAlert message={error} />}
      <Stack spacing={1.5}>
        {users.map((u) => (
          <Paper
            key={u.id}
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                fontWeight: 700,
                bgcolor: u.role === "Admin" ? GOLD : avatarColor(u.username),
                color: "#0b0f19",
              }}
            >
              {u.username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography noWrap sx={{ fontWeight: 700 }}>
                  {u.username}
                </Typography>
                <Chip
                  label={u.role}
                  size="small"
                  sx={{
                    backgroundColor:
                      u.role === "Admin" ? "rgba(245,197,24,0.15)" : "rgba(255,255,255,0.08)",
                    color: u.role === "Admin" ? GOLD : "text.secondary",
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" noWrap>
                {u.email}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              disabled={u.id === currentAdmin?.id}
              onClick={() => handleToggleRole(u)}
              sx={{ flexShrink: 0 }}
            >
              {u.role === "Admin" ? "Admin Yetkisini Kaldır" : "Admin Yap"}
            </Button>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
