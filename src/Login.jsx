// src/Login.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase/config"; // now inside src/
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./styles.css"; // now inside src/

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // LOGIN
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", res.user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const role = snap.data().role;
          window.location.href = role === "admin" ? "/admin" : "/user";
        } else {
          alert("User role not found.");
        }
      } else {
        // SIGNUP
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          email,
          role: "user",
          createdAt: new Date(),
        });
        alert("Account created successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper glass">
        <h2 className="login-title">{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="auth-btn"
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;