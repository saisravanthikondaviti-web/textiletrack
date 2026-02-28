import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
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

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

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
