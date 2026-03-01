import { useEffect, useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./firebase/config";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    processing: 0,
    completed: 0,
  });

  const navigate = useNavigate();

  // ✅ WAIT FOR AUTH FIRST
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("Auth User:", user);

      if (!user) {
        navigate("/"); // redirect if not logged in
        return;
      }

      // ✅ FETCH USERS ONLY AFTER AUTH IS READY
      const unsubscribeUsers = onSnapshot(
        collection(db, "users"),
        (snapshot) => {
          console.log("Snapshot size:", snapshot.size);

          const userList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUsers(userList);
        },
        (error) => {
          console.error("Firestore error:", error);
        }
      );

      return () => unsubscribeUsers();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // ✅ CHANGE ROLE
  const changeRole = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), {
        role: newRole,
      });
    } catch (error) {
      alert("Error updating role: " + error.message);
    }
  };

  // ✅ REALTIME TEXTILE STATS
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "textiles"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());

      const total = list.length;
      const processing = list.filter(
        (item) => item.status === "Processing"
      ).length;
      const completed = list.filter(
        (item) => item.status === "Completed"
      ).length;

      setStats({ total, processing, completed });
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>

        <div className="header-actions">
          <button
            className="nav-btn"
            onClick={() => navigate("/textiles")}
          >
            Textile Tracking
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* ===== STATS ===== */}
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

      {/* ===== USERS ===== */}
      <div className="admin-card">
        <h2>Users Management</h2>

        <div className="users-table">
          <div className="table-head">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Action</span>
          </div>

          {users.length === 0 && (
            <p style={{ padding: "10px" }}>No users found</p>
          )}

          {users.map((user) => (
            <div key={user.id} className="table-row">
              <span>{user.name || "—"}</span>
              <span>{user.email}</span>

              <span
                className={
                  user.role === "admin" ? "role-admin" : "role-user"
                }
              >
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