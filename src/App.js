import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import Login from "./Login";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import TextileDashboard from "./TextileDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        setUser(u);
        setRole(snap.data().role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to={`/${role}`} />}
        />

        <Route
          path="/admin"
          element={
            user && role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />

        <Route
          path="/user"
          element={
            user && role === "user" ? <UserDashboard /> : <Navigate to="/" />
          }
        />

        <Route path="/textiles" element={<TextileDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
