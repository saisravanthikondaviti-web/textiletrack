import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Sign in user
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Get user role from Firestore
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;

        if (role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      } else {
        alert("User role not found. Contact admin.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, width: 250, marginBottom: 10 }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8, width: 250, marginBottom: 10 }}
      />
      <br />

      <button
        onClick={handleLogin}
        style={{
          padding: "8px 20px",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;