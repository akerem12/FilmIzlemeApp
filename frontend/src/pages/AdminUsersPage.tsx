import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Chip } from "@mui/material";
import { getUsers, updateUserRole } from "../api/users";
import { getErrorMessage } from "../api/errorMessage";
import { useAuth } from "../context/AuthContext";
import type { AuthUser } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

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
    <Container sx={{ py: 3 }} maxWidth="md">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Kullanıcılar
      </Typography>
      {error && <ErrorAlert message={error} />}
      <List>
        {users.map((u) => (
          <ListItem
            key={u.id}
            divider
            secondaryAction={
              <Button
                size="small"
                variant="outlined"
                disabled={u.id === currentAdmin?.id}
                onClick={() => handleToggleRole(u)}
              >
                {u.role === "Admin" ? "Admin Yetkisini Kaldır" : "Admin Yap"}
              </Button>
            }
          >
            <ListItemText
              primary={
                <>
                  {u.username} <Chip label={u.role} size="small" sx={{ ml: 1 }} />
                </>
              }
              secondary={u.email}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
