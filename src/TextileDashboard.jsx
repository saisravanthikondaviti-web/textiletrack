import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase/config";
import AddTextile from "./AddTextile";

function TextileDashboard() {
  const [textiles, setTextiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // UPDATE TEXTILE STATUS
  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "textiles", id), {
      status: newStatus,
      updatedBy: auth.currentUser.email,
    });
  };

  const deleteTextile = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this textile?",
    );
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "textiles", id));
  };

  // REAL-TIME TEXTILE LISTENER
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "textiles"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTextiles(list);
    });

    return () => unsubscribe();
  }, []);

  // CHECK ADMIN ROLE
  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists() && snap.data().role === "admin") {
        setIsAdmin(true);
      }
    };

    checkRole();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Textile Tracking</h1>

      {/* ACTION BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => window.history.back()}>← Back</button>

        {isAdmin && (
          <button
            style={{ marginLeft: 10 }}
            onClick={() => setShowForm(!showForm)}
          >
            + Add Textile
          </button>
        )}
      </div>

      {/* ADD TEXTILE FORM */}
      {showForm && <AddTextile />}

      {/* TEXTILE LIST */}
      {textiles.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginTop: 12,
            borderRadius: 6,
          }}
        >
          <p>
            <b>Title:</b> {item.title}
          </p>
          <p>
            <b>Status:</b> {item.status}
          </p>
          <p>
            <b>Location:</b> {item.location}
          </p>
          <p>
            <b>Updated By:</b> {item.updatedBy}
          </p>

          {/* ADMIN STATUS CONTROLS */}
          {isAdmin && (
            <div style={{ marginTop: 10 }}>
              <button onClick={() => updateStatus(item.id, "Processing")}>
                Processing
              </button>

              <button
                style={{ marginLeft: 8 }}
                onClick={() => updateStatus(item.id, "Completed")}
              >
                Completed
              </button>
            </div>
          )}

          {isAdmin && (
            <button
              style={{ marginLeft: 8, background: "#ff4d4f", color: "white" }}
              onClick={() => deleteTextile(item.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TextileDashboard;
