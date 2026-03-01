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
import "./styles.css";
import { signOut } from "firebase/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function TextileDashboard() {
  const [textiles, setTextiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "textiles", id), {
      status: newStatus,
      updatedBy: auth.currentUser.email,
    });
  };

  const deleteTextile = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this textile?"
    );
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "textiles", id));
  };

  const exportToExcel = () => {
    const data = textiles.map((item) => ({
      Title: item.title,
      Status: item.status,
      Location: item.location,
      UpdatedBy: item.updatedBy,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Textiles");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "Textile_Data.xlsx");
  };

  const totalCount = textiles.length;
  const processingCount = textiles.filter((t) => t.status === "Processing")
    .length;
  const completedCount = textiles.filter((t) => t.status === "Completed")
    .length;

  // REAL-TIME LISTENER
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

  // PROTECT PAGE
  useEffect(() => {
    if (!auth.currentUser) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container">
      <h1>Textile Tracking</h1>

      {/* ===== Top Bar ===== */}
      <div className="top-bar">
        <button className="top-btn" onClick={() => window.history.back()}>
          ← Back
        </button>

        <div className="top-bar-right">
          {isAdmin && (
            <>
              <button
                className="top-btn secondary"
                onClick={() => setShowForm(!showForm)}
              >
                + Add Textile
              </button>

              <button className="top-btn secondary" onClick={exportToExcel}>
                Export Excel
              </button>
            </>
          )}

          <button className="top-btn danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Add Textile Form */}
      {showForm && <AddTextile />}

      {/* ===== Dashboard Cards ===== */}
      {isAdmin && (
        <div className="flex-container">
          <div className="card">
            <h3>Total Textiles</h3>
            <p>{totalCount}</p>
          </div>

          <div className="card">
            <h3>Processing</h3>
            <p>{processingCount}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{completedCount}</p>
          </div>
        </div>
      )}

      {/* ===== Search Bar ===== */}
      <input
        type="text"
        placeholder="Search by title, status, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===== Textile Items ===== */}
      {textiles
        .filter(
          (item) =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.status?.toLowerCase().includes(search.toLowerCase()) ||
            item.location?.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) => (
          <div key={item.id} className="textile-item">
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

            {isAdmin && (
              <div style={{ marginTop: 10 }}>
                <button
                  className="processing"
                  onClick={() => updateStatus(item.id, "Processing")}
                >
                  Processing
                </button>

                <button
                  className="completed"
                  onClick={() => updateStatus(item.id, "Completed")}
                >
                  Completed
                </button>

                <button
                  className="danger"
                  onClick={() => deleteTextile(item.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default TextileDashboard;