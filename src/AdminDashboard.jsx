import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase/config";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  const [stats, setStats] = useState({
    total: 0,
    processing: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), {
        role: newRole,
      });
      fetchUsers(); // refresh list after update
    } catch (error) {
      alert("Error updating role: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "textiles"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());

      const total = list.length;
      const processing = list.filter(
        (item) => item.status === "Processing",
      ).length;
      const completed = list.filter(
        (item) => item.status === "Completed",
      ).length;

      setStats({ total, processing, completed });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          <h3>Total Textiles</h3>
          <p>{stats.total}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          <h3>Processing</h3>
          <p>{stats.processing}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => (window.location.href = "/textiles")}>
          Go to Textile Tracking
        </button>

        <button onClick={handleLogout} style={{ marginLeft: 10 }}>
          Logout
        </button>
      </div>

      <h2 style={{ marginTop: 30 }}>All Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginTop: 12,
            borderRadius: 6,
          }}
        >
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>

          {user.role === "user" ? (
            <button onClick={() => changeRole(user.id, "admin")}>
              Promote to Admin
            </button>
          ) : (
            <button onClick={() => changeRole(user.id, "user")}>
              Remove Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
