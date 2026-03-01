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
  <div className="admin-container">
    <div className="admin-header">
      <h1>Admin Dashboard</h1>

      <div className="header-actions">
        <button
          className="nav-btn"
          onClick={() => window.location.href = "/textiles"}
        >
          Textile Tracking
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>

    {/* ===== STATS CARDS ===== */}
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>{stats.total}</p>
      </div>

      <div className="stat-card">
        <h3>Processing</h3>
        <p>{stats.processing}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{stats.completed}</p>
      </div>
    </div>

    {/* ===== USERS MANAGEMENT ===== */}
    <div className="admin-card">
      <h2>Users Management</h2>

      <div className="users-table">
        <div className="table-head">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Action</span>
        </div>

        {users.map((user) => (
          <div key={user.id} className="table-row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className={user.role === "admin" ? "role-admin" : "role-user"}>
              {user.role}
            </span>

            {user.role === "user" ? (
              <button
                className="promote-btn"
                onClick={() => changeRole(user.id, "admin")}
              >
                Promote
              </button>
            ) : (
              <button
                className="remove-btn"
                onClick={() => changeRole(user.id, "user")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;
