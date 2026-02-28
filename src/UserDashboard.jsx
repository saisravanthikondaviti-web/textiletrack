import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

function UserDashboard() {

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>User Dashboard</h1>
      <p>Welcome! You are logged in as USER.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserDashboard;