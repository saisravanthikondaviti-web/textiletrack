import { useState } from "react";
import { db, auth } from "./firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddTextile() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "textiles"), {
        title,
        status,
        location,
        updatedBy: auth.currentUser.email,
        createdAt: serverTimestamp()
      });

      alert("Textile added successfully!");
      setTitle("");
      setStatus("");
      setLocation("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Add Textile</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Textile Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Add Textile</button>
      </form>
    </div>
  );
}

export default AddTextile;